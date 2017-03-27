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
const mongodb = require('allco').mongodb;

async function test() {
	var [err, db] = await mongodb.db('mongodb://localhost:27017/test');
	if (err) throw err; // do your error handling here
	
	let main = db.collection('main');
	var [err, rep] = main.insert({foo: 'bar'});
	if (err) throw err;
	
	return [err, data];
}

test()
.then((result) => {
	console.log(result);
})
.catch(e => console.log(e));
```

### Installation

```shell
npm install allco
```
### Usage

**Note**

If you care about memory usage of allco,you can require what you need dividually.

e.g. `const mongodb = require('allco/mongodb');`

**fs**

**mongodb**

import:

```javascript
const mongodb = require('allco').mongodb; 
// or 
const mongodb = require('allco/mongodb');
```

connect:

```javascript
// connect to db
var [err, db] = await mongodb.db('mongodb://localhost:27017/test');
if (err) return console.log(err);	
// get a collection instance
let main = db.collection('main');
```


retrieve:

```javascript
// find with query which equals find(query).toArray((err, data) => {...})
var [err, rep] = await main.find({});
if (err) return console.log(err);	
// findOne method
var [err, rep] = await main.findOne({foo: 'fool'});
if (err) return console.log(err);
```

insert:

```javascript
// insert a doc
var [err, rep] = await main.insert({foo: 'bar'});
if (err) return console.log(err);
```

update:

```javascript
// update a doc
var [err, rep] = await main.update({foo: 'bar'}, {$set: {foo: 'fool'}}, {multi: true});
if (err) return console.log(err);
```

delete:

```javascript
// remove a doc
var [err, rep] = await main.remove({foo: 'bar'});
if (err) return console.log(err);
```
