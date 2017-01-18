"use strict";

var assert = require("assert");
var dd     = require("..");

function throwing(ok) {
	if(ok)
		return "test";

	throw new Error("test");
}

function asyn(ok, done, doneOk) {
	doneOk = dd(done, doneOk);
	doneOk.try(throwing.bind(null, ok), doneOk);
}

function createDone(self, done) {
	return function(err, test) {
		self.err = err;
		self.res = test;

		done();
	}
}

describe("doneOk.try", function() {
	describe("error in throwing function", function() {
		before(function(done) {
			asyn(false, createDone(this, done));
		});

		it("error", function() {
			assert.equal(this.err.message, "test");
		});
	});

	describe("success in throwing function", function() {
		before(function(done) {
			asyn(true, createDone(this, done));
		});

		it("error", function() {
			assert.equal(this.err, null);
		});

		it("result", function() {
			assert.equal(this.res, "test");
		});
	});
});
