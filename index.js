"use strict";

module.exports = function(done, doneOk) {
	var ret = function() {
		if(doneOk)
			return doneOk.apply(null, arguments);

		var args = [null];

		for(var i = 0; i < arguments.length; ++i)
			args.push(arguments[i]);

		done.apply(null, args);
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
