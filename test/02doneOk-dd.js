"use strict";

var assert = require("assert");
var dd     = require("..");

function Test(test, done) {
	this.done = done;
	this.test = "test";

	if(test)
		test.dd = dd(function(err) { test.err = err; });
}

Test.prototype.async = function(ok, done) {
	process.nextTick(ok ? function() { done(null, "test"); } : function() { done(new Error("test")); });
	process.nextTick(this.done);
};

function Test2(test, done) {
	Test.call(this, test, done);
}

Test2.prototype = new Test();

function prepare(success, done) {
	var self = this;

	this.test = new Test(this, done);
	this.test.async(success, this.dd.dd(function(res) { self.res = res; }));
}

describe("doneOk.dd", function() {
	describe("error in async function", function() {
		before(function(done) { prepare.call(this, false, done); });

		it("error", function() {
			assert.equal(this.err.message, "test");
		});
	});

	describe("success in async function", function() {
		before(function(done) { prepare.call(this, true, done); });

		it("error", function() {
			assert.equal(this.err, null);
		});

		it("result", function() {
			assert.equal(this.res, "test");
		});
	});
});
