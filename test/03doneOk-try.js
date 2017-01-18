"use strict";

var assert = require("assert");
var dd     = require("..");

function async(ok, done) {
	process.nextTick(ok ? function() { done(null, "test"); } : function() { done(new Error("test")); });
	process.nextTick(this.done);
}

function throwing(err) {
	if(err)
		throw new Error("test");

	return "test";
}

describe("doneOk.try", function() {
	describe("error in throwing function", function() {
		before(function(done) { prepare.call(this, false, done); });

		it("error", function() {
			assert.equal(this.err.message, "test");
		});
	});

	describe("success in throwing function", function() {
		before(function(done) { prepare.call(this, true, done); });

		it("error", function() {
			assert.equal(this.err, null);
		});

		it("result", function() {
			assert.equal(this.res, "test");
		});
	});
});
