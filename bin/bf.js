#!/usr/bin/env node

/* jshint esversion:6 */

var args = process.argv.slice(2);
var argv = require('minimist')(args.slice(1));
var util = require("./utils");
var menu = require("./menu");
var name = util.project();

util.printLogo();

switch (args[0]) {

	case "new":
		menu.fnit(argv._[0]);
		break;

	case "run":

		var compile = argv.c || argv.compile || "",
			file = argv.f || argv.file,
			verbose = argv.v || argv.verbose ? "-v" : "",
			onlyCompile = argv.o || argv.only,
			watch = argv.w || argv.watch;

		if (argv.d)
			file = "in.txt";

		menu.run(argv._[0], compile, name, file, verbose, onlyCompile, watch);

		break;

	case "init":
		menu.init(name);
		break;

	case "--v":
	case "--version":
		menu.version();
		break;

	default:
		menu.help();
		break;

}