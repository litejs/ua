


require("litejs/test")
.describe("ua")
.it ("should parse user agents", function(assert) {
	var parse = require("..").ua
	, files = [
		"android.js",
		"safari.js",
		"ie.js",
		"windows.js",
		"other.js",
		"unsorted.js"
	]

	files.forEach(function(file) {
		var res, log, map
		, input = require("./" + file)
		, i = 0
		, len = input.length

		assert.ok(len > 0, file + " should contain tests")

		for (; i < len; i++) {
			if (typeof input[i] === "string") {
				res = parse(input[i])
				log = input[i] + "\n" + JSON.stringify(res) + "\n" + JSON.stringify(map)
				if (map.os) assert.equal(res.os, map.os, log)
				if (map.browser) {
					delete res.browser.sub
					assert.equal(res.browser, map.browser, log)
				}
				if (map.device) assert.equal(res.device, map.device, log)
			} else {
				map = input[i]
			}
		}
	})

	assert.end()
})

