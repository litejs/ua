


require("..")
.describe("lib/util")
.it ("should parse user agents", function(assert) {
	var map
	, parse = require("../../lib/ua.js").ua
	, input = [

{os:{name:"Firefox OS",ver:"1",full:"1.1"},browser:{name:"Firefox",ver:"18",full:"18.1"},device:"Mobile"},
"Mozilla/5.0 (Mobile; rv:18.1) Gecko/18.1 Firefox/18.1",
"Mozilla/5.0 (Mobile; ZTEOPEN; rv:18.1) Gecko/18.1 Firefox/18.1",
"Mozilla/5.0 (Mobile; HUAWEIY300-F1; rv:18.1) Gecko/18.1 Firefox/18.1",
"Mozilla/5.0 (Mobile; LG-D300; rv:18.1) Gecko/18.1 Firefox/18.1",
"Mozilla/5.0 (Mobile; ALCATELOneTouch4012X; rv:18.1) Gecko/18.1 Firefox/18.1",

// Firefox for iOS
{os:{name:"iOS",ver:"8",full:"8.3"},browser:{name:"Firefox",ver:"1",full:"1.0"},device:"Tablet"},
"Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4",
{os:{name:"iOS",ver:"8",full:"8.3"},browser:{name:"Firefox",ver:"1",full:"1.1"},device:"Mobile"},
"Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.1 Mobile/12F69 Safari/600.1.4",
"Mozilla/5.0 (iPod touch; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.1 Mobile/12F69 Safari/600.1.4",

// Chrome for iOS
{os:{name:"iOS",ver:"10",full:"10.3"},browser:{name:"Chrome",ver:"56",full:"56.0.2924.75"},device:"Mobile"},
"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",


{os:{name:"Windows",ver:"3",full:"3.11"},browser:{name:"IE",ver:"1",full:"1.0"},device:"Desktop"},
"Mozilla/4.0 (compatible; MSIE 1.0; Windows 3.11)",

{os:{name:"Windows",ver:"2000",full:"2000"},browser:{name:"IE",ver:"3",full:"3.0"},device:"Desktop"},
"Mozilla/3.0 (compatible; MSIE 3.0; Windows NT 5.0)",

{os:{name:"Windows",ver:"95",full:"95"},browser:{name:"IE",ver:"3",full:"3.0"},device:"Desktop"},
"Mozilla/4.0 (compatible; MSIE 3.0; Windows 95; .NET CLR 3.0.30729)",

{os:{name:"Windows",ver:"95",full:"95"},browser:{name:"IE",ver:"2",full:"2.0"},device:"Desktop"},
"Mozilla/1.22 (compatible; MSIE 2.0; Windows 95)",

{os:{name:"Windows",ver:"98",full:"98"},browser:{name:"IE",ver:"4",full:"4.01"},device:"Desktop"},
"Mozilla/4.0 (compatible; MSIE 4.01; MSN 2.5; Windows 98)",

{os:{name:"Windows",ver:"8",full:"8.1"},browser:{name:"IE",ver:"11",full:"11.0"},device:"Desktop"},
"Mozilla/5.0 (IE 11.0; Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",

{os:{name:"Android"},browser:{name:"Firefox",ver:"24",full:"24.0"},device:"Mobile"},
"Mozilla/5.0 (Android; Mobile; rv:24.0) Gecko/24.0 Firefox/24.0",

{os:{name:"Linux"},browser:{name:"Firefox",ver:"3",full:"3.6.9"},device:"Desktop"},
"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.2.9) Gecko/20100825 Ubuntu/9.10 (karmic) Firefox/3.6.9",

{os:{name:"webOS",ver:"2",full:"2.0.1"},browser:{name:"Safari",ver:"1",full:"1.0"},device:"SmartTV"},
"Mozilla/5.0 (web0S/2.0.1; U; en-US) AppleWebKit/532.2 (KHTML, like Gecko) Version/1.0 Safari/532.2 Pre/1.2",


{os:{name:"?"},browser:{name:"?"},device:"?"},
"ab",
""
	]
	, i = 0
	, len = input.length

	for (; i < len; i++) {
		if (typeof input[i] === "string") {
			assert.equal(parse(input[i]), map)
		} else {
			map = input[i]
		}
	}

	assert.end()
})

