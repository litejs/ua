


describe("User-Agent parser", function() {
	var parse = require("..").ua
	, files = [
		"android.js",
		"safari.js",
		"ie.js",
		"windows.js",
		"bot.js",
		"other.js",
		"unsorted.js"
	]

	files.forEach(function(file) {
		it ("should run " + file, function(assert) {
			var res, log, map
			, input = require("./" + file)
			, i = 0
			, len = input.length

			assert.ok(len > 0, file + " should contain tests")

			for (; i < len; i++) {
				if (typeof input[i] === "string") {
					res = parse(input[i], map.hint)
					if (map.browser) assert.equal(map.browser, res.browser)
					if (map.os) assert.equal(map.os, res.os)
					if (map.device) assert.equal(map.device, res.device)
				} else {
					map = input[i]
				}
			}
			assert.end()
		})
	})
})

