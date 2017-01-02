"use strict";

var assert   = require("assert");
var dd       = require("..");
//var helper   = require("./helper");

describe("double-done", function() {
	describe("called as DD", function() {
		before(function() {
			this.count = 0;
			this.doneOk = dd(null, (function(a, b, c) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.count++;
			}).bind(this));
		});

		it("no parameters", function() {
			this.doneOk();
			assert.equal(this.count, 1);
		});

		it("1 parameters", function() {
			this.doneOk(3);
			assert.equal(this.a, 3);
			assert.equal(this.count, 2);
		});

		it("2 parameters", function() {
			this.doneOk(1, 2);
			assert.equal(this.a, 1);
			assert.equal(this.b, 2);
			assert.equal(this.count, 3);
		});
	});

	describe("called as SD", function() {
		before(function() {
			this.count = 0;
			this.doneOk = dd((function(a, b, c) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.count++;
			}).bind(this));
		});

		it("no parameters", function() {
			this.doneOk();
			assert.equal(this.a, null);
			assert.equal(this.count, 1);
		});

		it("1 parameters", function() {
			this.doneOk(3);
			assert.equal(this.a, null);
			assert.equal(this.b, 3);
			assert.equal(this.count, 2);
		});

		it("2 parameters", function() {
			this.doneOk(1, 2);
			assert.equal(this.a, null);
			assert.equal(this.b, 1);
			assert.equal(this.c, 2);
			assert.equal(this.count, 3);
		});
	});
});
