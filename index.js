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
		return function() {
			if(arguments[0])
				return done(arguments[0]);

			var args = [];

			for(var i = 1; i < arguments.length; ++i)
				args.push(arguments[i]);

			callbackOk.apply(null, args);
		};
	};

	return ret;
};
