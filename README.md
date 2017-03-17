# allco
a lib for writing i/o codes and error handling like which in golang

  As node supports async/await feature, we can code with less calbacks, but the same time we get a lot of `try catch` codes when error handling
so, I write this lib for wrapping the natural async i/o modules.

### demo

```javascript
const fs = require('allco').fs;

async function foo() {
	const [err, data] = await fs.readFile('hello.txt', 'utf8');
	if (err) return console.log(err);
	console.log(data);
}

foo();
```
