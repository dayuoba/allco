const _fs = require('fs');
const utils = require('../utils')
const fsModules = Object.keys(_fs);
const fs = module.exports = {}; 
// TODO 
// some methods that use linstener
// need to be converted correctly
const exportModules = [
	'access',
	'appendFile',
	'chmod',
	'chown',
	'close',
	'fchmod',
	'fchown',
	'fdatasync',
	'fstat',
	'fsync',
	'ftruncate',
	'futimes',
	'lchmod',
	'lchown',
	'link',
	'lstat',
	'mkdir',
	'mkdtemp',
	'open',
	'read',
	'readdir',
	'readFile',
	'readlink',
	'realpath',
	'rename',
	'rmdir',
	'stat',
	'symlink',
	'truncate',
	'unlink',
	//'unwatchFile',
	'utimes',
	// 'watch',
	'write',
	'writeFile',
];

fsModules.forEach((module) => { 
	if (~exportModules.indexOf(module)) {
		fs[module] = utils.allco(_fs[module]);
	}
});

