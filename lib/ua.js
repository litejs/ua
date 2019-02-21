
/*! litejs.com/MIT-LICENSE.txt */

!function(exports) {
	exports.ua = parse

	var re = /(\w+)\/(\S+)(?:\s*\((.+?)\))?/g
	, browsers = [
		"Opera",
		"Firefox",
		"Chrome",
		"Safari",
		"IE",
		"MSIE"
	]
	, alias = {
		CriOS: "Chrome",
		FxiOS: "Firefox",
		iPhone: "iOS",
		iPad: "iOS",
		iPod: "iOS",
		MSIE: "IE"
	}
	, osList = [
		"Android",
		"iOS",
		"iPad",
		"iPod",
		"iPhone",
		"Macintosh",
		/(?:web|hpw)[o0]s/i, "webOS",
		"Linux",
		"Windows"
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
		"4.90":"ME",
		"5.0":"2000",
		"5.1":"XP",
		"5.2":"XP",
		"6.0":"Vista",
		"6.1":"7",
		"6.2":"8",
		"6.3":"8.1",
		"6.4":"10",
		"NT 10.0":"10",
		"ARM":"RT"
	}

	function parse(str) {
		var match, sp, junk
		, map = {}
		, out = {}

		for (; match = re.exec(str);) {
			junk = map[alias[match[1]] || match[1]] = {
				name: alias[match[1]] || match[1],
				ver: match[2]
			}
			if (match[3]) {
				junk.sub = match[3]
			}
		}
		sp = (map.Mozilla && map.Mozilla.sub || "").split(/[\/;\s]+/)

		scan("os", osList)
		scan("browser", browsers)

		if (!out.device) out.device = (
			sp.indexOf("Tablet") > -1 ? "Tablet" :
			map.Mobile || sp.indexOf("Mobile") > -1 ? "Mobile" :
			// On Desktop, geckotrail is the fixed string "20100101"
			map.Gecko && map.Gecko.ver == "20100101" ||
			map.Firefox ? "Desktop" :
			"?"
		)

		return out

		function scan(attr, list) {
			for (var match, name, i = 0, len = list.length; !match && i < len; ) {
				name = list[i++]
				if (typeof name !== "string") {
					if (match = name.exec(str)) {
						alias[name = "" + match] = list[i++]
					} else {
						name = list[i++]
					}
				}
				if (match = map[name]) {
					if (name == "Safari") {
						match.ver = map.Version.ver
					}
				} else if ((idx = sp.indexOf(name)) > -1) {
					match = {
						name: alias[name] || name
					}
					if (match.name === "iOS") {
						idx = sp.indexOf("OS")
						if (idx > -1) match.ver = sp[idx+1].replace(/_/g, ".")
						out.device = name == "iPad" ? "Tablet" : "Mobile"
					} else if (match.name === "webOS" || name === "Windows" || match.name === "IE") {
						match.ver = sp[idx+1]
						if (match.ver == "NT") {
							match.ver = winVer[sp[idx+2]]
						}
						out.device = match.name === "webOS" ? "SmartTV" : "Desktop"
					}
				}
			}
			if (!match) {
				if (attr == "os") {
					if (map.Gecko) match = {
						name: "Firefox OS",
						ver: ffOs[map.Gecko.ver] || "unknown"
					}
				}
			}
			out[attr] = match || {name: "?"}
			if (match && match.ver) {
				match.full = match.ver
				match.ver = match.ver.split(".").shift()
			}
		}
	}
}(this)


