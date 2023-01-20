
/*! litejs.com/MIT-LICENSE.txt */

!function(exports) {
	// http://www.zytrax.com/tech/web/mobile_ids.html
	exports.ua = ua

	var re = /(\w+)(?:\/| )([^\s;]+)(?:\s*\((.+?)\))?/g
	, MOBILE = "Mobile"
	, TABLET = "Tablet"
	, DESKTOP = "Desktop"
	, SMART_TV = "SmartTV"
	, BOT = "Bot"
	, TOOL = "Tool"
	, browsers = [
		"Firefox",
		"Edge",
		/Brave Chrome\/([\d.]+)/, "Brave",
		"Chrome",
		"Android",
		/SamsungBrowser|TV Safari/, "Samsung Browser",
		"Safari",
		/IE|MSIE|Trident.*rv:([\d.]+)/, "IE"
	]
	, _alias = {
		ia_archiver: "Alexa",
		facebookexternalhit: "Facebook",
		CriOS: "Chrome",
		FxiOS: "Firefox",
		OPiOS: "Opera",
		AppleWebKit: "Safari",
		Macintosh: "OS X"
	}
	, botList = [
		"Baiduspider",
		"Bingbot",
		"Exabot",
		"Googlebot",
		"Yahoo!",
		"YandexBot"
	]
	, osList = [
		"AmigaOS",
		"Windows",
		"Android",
		/iP(?:ad|od|hone)/, "iOS",
		"Macintosh",
		"Tizen",
		/(?:web|hpw)[o0]s/i, "webOS",
		/CrOS/, "Chromium OS",
		"Linux",
		"FreeBSD",
		"NetBSD",
		"OpenBSD",
		"Fuchsia"
	]
	, ffOs = {
		"18.0": "1.0.1",
		"18.1": "1.1",
		"26.0": "1.2",
		"28.0": "1.3",
		"30.0": "1.4",
		"32.0": "2.0",
		"34.0": "2.1",
		"37": "2.2",
		"44": "2.5"
	}
	, winVer = {
		"4.0":"NT",
		"4.90":"ME",
		"5.0":"2000",
		"5.01":"2000",
		"5.1":"XP",
		"5.2":"XP", // Or Server 2003
		"6.0":"Vista",
		"6.1":"7",
		"6.2":"8",
		"6.3":"8.1",
		"6.4":"10" // Windows 10 preview
	}

	function ua(str, hint) {
		var _device, match, spi, first
		, sp = ""
		, map = {}
		, alias = hint || _alias

		for (; (match = re.exec(str));) {
			if (!first) first = match
			spi = map[alias[match[1]] || match[1]] = map[match[1]] = {
				name: alias[match[1]] || match[1],
				ver: match[2].replace(/,/g, ".")
			}
			if (match[3]) {
				spi.sub = match[3]
				if (sp === "") {
					sp = match[3].split(/(?:x86_64|[\/;\s])+/)
				}
			}
		}
		spi = sp.indexOf.bind(sp)

		return {
			os: scan(osList),
			browser: scan(browsers),
			device: _device || (
				map.Mobile || spi(MOBILE) > -1 ? MOBILE :
				spi(TABLET) > -1 || spi("Android") > -1 ? TABLET :
				map.SmartTV || map.GoogleTV || sp[0] === "SMART-TV" ? SMART_TV :
				// On Desktop, geckotrail is the fixed string "20100101"
				map.Gecko && map.Gecko.ver === "20100101" ||
				map.Firefox || spi("Linux") > -1 ? DESKTOP :
				map.Alexa || map.DuckDuckBot || map.Facebook || botList.indexOf(sp[1]) > -1 ? BOT :
				map.curl || first && first[1] === "Wget" ? TOOL :
				"?"
			)
		}

		function scan(list) {
			for (var match, name, t, i = 0, len = list.length; !match && i < len; ) {
				t = alias[name = list[i++]]
				if (typeof name !== "string") {
					if ( (match = name.exec(str)) ) {
						t = alias[name = match[0]] = list[i]
						i = len
					} else {
						name = list[i++]
					}
				}
				if (match && match[1]) {
					match = { name: t, ver: match[1] }
				} else if ( (match = map[name]) ) {
					if (name === "Edge" && match.ver < 42) {
						match.ver = "" + (parseFloat(match.ver) + 25)
					}
					if (name === "Safari") {
						t = parseInt((map.AppleWebKit || match).ver)
						match.ver = (
							t < 100 ? "1.0" :
							t < 124 ? "1.1" :
							t < 312 ? "1.2" :
							t < 412 ? "1.3" :
							t < 420 ? "2.0" :
							map.Version ? map.Version.ver :
							"?"
						)
					}
				} else if ((idx = spi(t === "iOS" || t === "OS X" ? "OS" : name)) > -1) {
					match = {
						name: alias[name] || name
					}
					if (name === "Android") {
						if (list === browsers && map.Version) {
							match.name += " Browser"
							match.ver = map.Version.ver
							break
						}
					}
					if (name === "Windows") {
						_device = DESKTOP
						if (sp[idx + 1] === "ME") {
							match.ver = "ME"
							break
						}
						if ( (t = spi("NT") + 1 || spi("9x") + 1) ) idx = t - 1
						t = sp[idx + 1]
						if (t === "Phone" || t === MOBILE || t === "CE") {
							match.name += " " + t
							idx += 1 + (sp[idx + 2] === "OS")
							_device = MOBILE
						} else {
							t = name
						}
					}
					if (parseFloat(sp[++idx]) || parseFloat(sp[++idx])) {
						match.ver = name === t && winVer[sp[idx]] || sp[idx].replace(/_/g, ".")
					}
					if (t === "iOS") {
						_device = name === "iPad" ? TABLET : MOBILE
					}
					if (match.name === "webOS") {
						_device = SMART_TV
					}
				}
			}
			if (!match) {
				if (list === osList) {
					if (map.Gecko) match = {
						name: "Firefox OS",
						ver: ffOs[map.Gecko.ver] || "?"
					}
				}
				if (list === browsers) {
					if (first && first[1] !== "Mozilla") {
						match = { name: alias[first[1]] || first[1] }
						if (parseFloat(first[2])) match.ver = first[2]
					}
					if (sp[0] === "compatible") match = { name: sp[1], ver: sp[2] }
				}
			}
			if (match && match.ver) {
				match.full = match.ver
				match.ver = match.ver.split(".")[0]
			}
			return match || {name: "?"}
		}
	}
}(this) // jshint ignore:line


