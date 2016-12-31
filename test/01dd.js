"use strict";

var assert   = require("assert");
var dd       = require("..");
//var helper   = require("./helper");

describe("dd", function() {
	describe("dd", function() {
		before(function(done) {
			this.dd = dd();
			done();
		});

		it("dd", function() {
			assert.equal(typeof this.dd, "function");
		});
	});
});
