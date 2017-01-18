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

describe("doneOk.try", function() {
	describe("error in throwing function", function() {
		before(function(done) {
			var self = this;

			asyn(false, function(err, test) {
				self.err = err;
				self.res = test;

				done();
			});
		});

		it("error", function() {
			assert.equal(this.err.message, "test");
		});
	});

	describe("success in throwing function", function() {
		before(function(done) {
			var self = this;

			asyn(true, function(err, test) {
				self.err = err;
				self.res = test;

				done();
			});
		});

		it("error", function() {
			assert.equal(this.err, null);
		});

		it("result", function() {
			assert.equal(this.res, "test");
		});
	});
});
