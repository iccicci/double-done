"use strict";

module.exports = function(done, doneOk) {
	var ret = function() {
		if(doneOk)
			return doneOk.apply(null, arguments);

		done.apply(null, [null].concat(Array.from(arguments)));
	};

	ret.dd = function(callbackOk) {
		return function(err) {
			if(err)
				return done(err);

			callbackOk.apply(null, Array.prototype.slice.call(arguments, 1));
		};
	};

	ret.try = function(func, callbackOk) {
		var ret;

		try { ret = func(); }
		catch(e) { return process.nextTick(done.bind(null, e)); }

		callbackOk(ret);
	};

	return ret;
};
