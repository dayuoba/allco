const utils = module.exports = {};

utils.wrap2AllcoFns = function(nativeModule) {
	return async function() {
		let err, rep;
		try {
			data = await promisefulNativeModule(nativeModule).apply(null, convertArgs2Array(arguments));
		} catch(e) {
			err = e;
		}

		return [err, data];
	}
}

promisefulNativeModule = function(nativeModule) {
	return async function() {
		let args = convertArgs2Array(arguments);
		return new Promise((resolve, reject) => {
			nativeModule.apply(null, args.concat(wrapperedCallback(resolve, reject)))
		});
	}
}

convertArgs2Array = function(args = null) {
	return [].slice.call(args) || [];
}

wrapperedCallback = function(resolve, reject) {
	return function(err, rep) {
		if (err) return reject(err);
		resolve(rep);
	}
}
