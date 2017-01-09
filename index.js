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

	return ret;
};
