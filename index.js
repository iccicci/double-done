"use strict";

module.exports = function(done, doneOk) {
	if(doneOk)
		return doneOk;

	return function() {
		var args = [null];

		for(var i in arguments)
			args.push(arguments[i]);

		done.apply(null, args);
	};
};
