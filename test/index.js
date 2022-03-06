


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
					res = parse(input[i])
					assert.own(res, map)
				} else {
					map = input[i]
				}
			}
			assert.end()
		})
	})
})

