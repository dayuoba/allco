const _mongo = require('mongodb').MongoClient;
const utils = require('../utils');

const mongo = module.exports = {};

mongo.getNative = () => {return _mongo;};

mongo.db = async function(options) {
	const db = {
		_collections: {},
		_db: null,
		conllection: null,
		getNative: function() {return this._db}
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
	collection.getNative = () => collection._col;
	exportMethods.forEach((method) => {
		collection[method] = _bindMethod(collection, col, method);
	});
	// `find` is a particular method
	collection.find = function() {
		const col = collection._col;
		let args = [].slice.call(arguments);
		const _cursor = col.find.apply(col, args);
		const cursor = _wrapCursor(_cursor);
		return cursor;
	};

	return collection;
}

function _wrapCursor(ori) {
	const cursor = {};
	cursor._csr = ori;	
	cursor.getNative = () => {return cursor._csr};
	cursor.skip = function(num) {
		this._csr = this._csr.skip.apply(this._csr, [num]);
		return this;
	};

	cursor.limit = function(num) {
		this._csr = this._csr.limit.apply(this._csr, [num]);
		return this;
	};

	cursor.toArray = async function() {
		let err, data;
		const self = this;
		try {
			data = await new Promise((res, rej) => {
				self._csr.toArray((err, result) => {
					if (err) return rej(err);
					return res(result);
				});
			});
		} catch(e) {
			err = e;
		}
		return [err, data];
	};
	return cursor;
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




