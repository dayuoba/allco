# allco 

**Makes your async node code clearify**
**without plenty of try{}catch(e){}**

a lib for writing i/o codes and error handling like which in golang

  As node supports async/await feature, we can code with less calbacks, but the same time we get a lot of `try catch` codes when error handling
so, I write this lib for wrapping the natural async i/o modules.

 As there is a popular node_module called co, so  i name this one all-co :)

## Note
this module is still being developed

### demo

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
