const fs = require('./').fs;
const mongodb = require('./').mongodb;
const http = require('http');

async function testReadFile() {
	// if you has muilti await calls in one function
	// and use the same error variable name just like err
	// pls use `var` for declaration, because when using
	// using `let` that node will throw re-define exception
	var [err, data] = await fs.writeFile('foo.txt', new Buffer('hello world\n'), 'utf8');
	if (err) return console.log(err);

	var [err, data] = await fs.readFile('foo.txt', 'utf8');
	if (err) return console.log(err);
	// if you want to  just return this 
	// and throw error handling for other invokers
	// just return err and data
	// return [err, data];
	var [err, db] = await mongodb.db('mongodb://localhost:27017/test');
	if (err) return console.log(err);	
	let main = db.collection('main');
	var [err, rep] = await main.find({});
	// console.log(err, rep)
	var [err, rep] =await main.insert({foo: 'bar'});
	// console.log(err, rep);
	var [err, rep] = await main.update({foo: 'bar'}, {$set: {foo: 'fool'}}, {multi: true});
	// console.log(err, rep);
	var [err, rep] = await main.remove({foo: 'bar'});
	var [err, rep] = await main.findOne({foo: 'fool'});
	console.log(err, rep);
	// if (err) return console.log(err)
	// console.log('***')
	// console.log(rep)
	// console.log('***')
	// let main = db.collection('main');
	// var [err, rep] = main.insert({foo: 'bar'});
	// if (err) return console.log(err);
	// console.log(rep);

	// main.insert({foo: 'bar'}, (err, rep) => {
	// 	if (err) return console.log(err);
	// 	console.log(rep)
	// })



}

testReadFile()
.then((result) => {
	console.log(result);// [undefined, 'hello world\n']
});