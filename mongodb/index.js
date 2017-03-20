const _mongo = require('mongodb').MongoClient;
const utils = require('../utils');

const mongo = module.exports = {};

mongo.db = async function(options) {
	const db = {
		_collections: {},
		_db: null,
		conllection: null
	}; 
	let [err, _db] = await _connect(options);
	if (!err) {
		db._db = _db;
		_wrapDb(db);
	}
	return [err, db];
};

const _connect = utils.allco(_mongo.connect);

const _wrapDb = function(db) {
	db.collection = function(colName) {
		if (!db._collections[colName]) db._collections[colName] = _wrapCollection(db._db.collection(colName));  
		return db._collections[colName];
	}
};

const _wrapCollection = function(col) {
	const exportMethods = ['insert', 'update', 'findOne', 'remove'];
	const collection = {};
	collection._col = col;
	// export this raw collection instance
	// because sometimes you may need to retrieve as stream
	collection.getRaw = () => collection._col;
	exportMethods.forEach((method) => {
		collection[method] = _bindMethod(collection, col, method);
	});
	// `find` is a particular method
	collection.find = async function() {
		const col = collection._col;
		let args = [].slice.call(arguments);
		let err, data;
		try {
			data = await new Promise((resolve, reject) => {
				col.find.apply(col, args).toArray((err, rep) => {
					if (err) return reject(err);
					resolve(rep);
				})
			})
		} catch(e) {
			err = e;
		}

		return [err, data];
	};

	return collection;
}


function _bindMethod(collection, col, method) {
	return async function() {
		const col = collection._col;
		let args = [].slice.call(arguments);
		let err, data;
		try {
			data = await new Promise((resolve, reject) => {
				col[method].apply(col, args.concat(callback));
				function callback(err, rep) {
					if (err) return reject(err);
					return resolve(rep);
				}
			})
		} catch(e) {
			err = e;
		}
		return [err, data];
	}
}




