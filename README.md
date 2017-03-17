# allco
a lib for writing i/o codes and error handling like which in golang

  As node supports async/await feature, we can code whih less calbacks, but the same time we get a lot of `try catch` codes when error handling
so, I write this lib for wrapping the natural async i/o modules.

### demo

```
const fs = require('allco').fs;

async function foo() {
	const [err, data] = await fs.readFile('hello.txt', 'utf8');
	if (err) return console.log(err);
	console.log(data);
}

foo();
```
