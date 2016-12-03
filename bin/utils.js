/* jshint esversion: 6*/
var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');
var templ = require('./template');

const regex = /.*(?:\/|\\)(.*)/g;

/* Regex Utils */
var lastMatch = str => {
	var match = regex.exec(str);
	return match ? match[1] : str;
};

/* File/Dir Utils */

// get project name
var project = () => {
	return lastMatch(process.cwd());
};

// clear all build files
var clear = (name, exe) => {

	let cb = () => {};

	fs.unlink(`${name}.lex.c`, cb);
	fs.unlink(`${name}.tab.c`, cb);
	fs.unlink(`${name}.tab.h`, cb);
	fs.unlink(`temp`, cb);

	if (exe)
		setTimeout(() => {
			fs.unlink(`${name}.exe`, cb);
		}, 500);

};

// save new file
var save = (file, content) => {
	fs.writeFileSync(file, content, 'utf-8');
};

var mkdir = name => {

	var path = `${process.cwd()}/${name}`;

	try {
		fs.mkdirSync(path);
		exec(`start ${name}`);
	} catch (e) {
		path = null;
		console.log(' Err: Cannot create project folder.');
	}

	return path;

};

/* Cli Utils */

var printLogo = () => {
	console.log(templ.logo + '\n');
};

// run single command
var cmd = (cmd, then) => {

	exec(cmd, (err, stdout, stderr) => {

		var step = cmd.split(' ')[0];

		if (err || stderr) {
			console.log(` Err (${step}):\n`);
			console.log(stderr);
			return clear();
		}

		if (stdout) {
			console.log(' Output:');
			console.log(stdout);
		}

		then();

	});

};

/* Template Utils */

// load flex,bison template and autocomplete bison header
var template = (type, name) => {

	var content = templ[type];

	if (name)
		content = content.replace('$bison', `${name}.tab.h`);

	return content;
};

exports.cmd = cmd;
exports.clear = clear;
exports.save = save;
exports.mkdir = mkdir;
exports.project = project;
exports.template = template;
exports.lastMatch = lastMatch;
exports.printLogo = printLogo;