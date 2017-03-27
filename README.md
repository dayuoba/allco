# allco 

**clarify your async js code**
**without plenty of try{}catch(e){}**

a lib for writing i/o codes and error handling  which is like coding in golang

  As node supports async/await feature, we can code with less calbacks, but the same time we get a lot of `try catch` codes when error handling
so, I write this lib for wrapping the natural async i/o modules.

 As there is a popular node_module called co, so  i name this one all-co :)

## Note
this module is still being developed

### Demo

```javascript
const fs = require('allco').fs;

async function testReadFile() {
	// if you has mutli await calls in one function
	// and use the same error variable name just like err
	// pls use `var` for declaration, because when using
	// using `let` that node will throw re-define exception
	var [err, data] = await fs.writeFile('foo.txt', new Buffer('123'), 'utf8');
	if (err) return console.log(err);

	var [err, data] = await fs.readFile('hello.txt', 'utf8');
	if (err) return console.log(err);
	// if you want to  just return this 
	// and throw error handling for other invokers
	// just return err and data
	return [err, data];
}

testReadFile()
.then((result) => {
	console.log(result);// [undefined, 'hello world\n']
});
```

### Installation

```shell
npm install allco
```
### Usage

**Note**

If you care about memory usage of allco,you can require what you need dividually.
eg. `const mongodb = require('allco/mongodb');`

* fs

* mongodb

```javascript

const mongodb = require('allco').mongodb;
// connect to db
var [err, db] = await mongodb.db('mongodb://localhost:27017/test');
if (err) return console.log(err);	
// get a collection instance
let main = db.collection('main');
var [err, rep] = await main.find({});
if (err) return console.log(err);	
// insert a doc
var [err, rep] = await main.insert({foo: 'bar'});
if (err) return console.log(err);
// update a doc
var [err, rep] = await main.update({foo: 'bar'}, {$set: {foo: 'fool'}}, {multi: true});
if (err) return console.log(err);
// remove a doc
var [err, rep] = await main.remove({foo: 'bar'});
if (err) return console.log(err);
// findOne method
var [err, rep] = await main.findOne({foo: 'fool'});
if (err) return console.log(err);

```
