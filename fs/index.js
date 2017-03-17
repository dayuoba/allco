const fs = require('fs');

const ac_fs = module.exports = {}; 

ac_fs.name = 'fs';

ac_fs.readFile = async function() {
	let err, data;
	try {
		data = await _readFile.apply(null, convertArgs2Array(arguments)); 
	} catch(e) {
		err = e;
	}
	return [err, data];
};

ac_fs.writeFile = async function() {
	let err, data;
	try {
		data = await _writeFile.apply(null, convertArgs2Array(arguments));
	} catch(e) {
		err = e;
	}
	return [err, data];
};

async function _readFile() {
	let args = convertArgs2Array(arguments)
	return new Promise((resolve, reject) => {
		fs.readFile.apply(null, args.concat(wrapperedCallback(resolve, reject)))
	});
}

async function _writeFile() {
	let args = convertArgs2Array(arguments)
	return new Promise((resolve, reject) => {
		fs.writeFile.apply(null, args.concat(wrapperedCallback(resolve, reject)))
	});
}



function convertArgs2Array(args = null) {
	return [].slice.call(args) || [];
}

function wrapperedCallback(resolve, reject) {
	return function(err, rep) {
		if (err) return reject(err);
		resolve(rep);
	}
}
