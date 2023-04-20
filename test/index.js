


describe("User-Agents in {0}", [
	"android.js",
	"safari.js",
	"ie.js",
	"windows.js",
	"bot.js",
	"other.js",
	"unsorted.js"
], function(file) {
	var parse = require("..").ua

	it ("should run " + file, function(assert) {
		var res, log, map
		, input = require("./" + file)
		, i = 0
		, len = input.length

		assert.ok(len > 0, file + " should contain tests")

		for (; i < len; i++) {
			if (typeof input[i] === "string") {
				res = parse(input[i], map.hint)
				if (map.browser) assert.equal(res.browser, map.browser)
				if (map.os) assert.equal(res.os, map.os)
				if (map.device) assert.equal(res.device, map.device)
			} else {
				map = input[i]
			}
		}
		assert.end()
	})
})

