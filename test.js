const fs = require('./').fs;
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
	return [err, data];

}

testReadFile()
.then((result) => {
	console.log(result);// [undefined, 'hello world\n']
});