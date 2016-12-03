/* jshint esversion:6 */

var util = require('./utils');
var bin = require('./binaries');
var chokidar = require('chokidar');

var init = (name) => {
	util.save(`${name}.l`, util.template('flex', util.lastMatch(name)));
	util.save(`${name}.y`, util.template('bison'));
	console.log(` \u2713 Init`);
};

var fnit = name => {
	var path = util.mkdir(name);
	if (path) {
		console.log(` \u2713 Project Created\n`);
		init(`${path}/${name}`);
	}
};

var startWatch = (input, compile, name, file, verbose, onlyCompile) => {

	console.log(` \u2713 Watching ${name}.l ${name}.y ${file ? file : ""}\n`);

	var watcher = chokidar.watch([`${name}.l`, `${name}.y`], {
		persistent: true,
		awaitWriteFinish: {
			stabilityThreshold: 1000,
			pollInterval: 250
		}
	});

	if (file)
		watcher.add(file);

	watcher
		.on('change', path => {
			run(input, compile, name, file, verbose, onlyCompile, false);
		});

};

var run = (input, compile, name, file, verbose, onlyCompile, watch) => {

	if (!input && !file && !onlyCompile) {
		console.log(' Err: Input | File not defined.');
		return;
	}

	if (watch)
		return startWatch(input, compile, name, file, verbose, onlyCompile);

	console.log('\x1Bc');

	util.printLogo();

	console.log(' Checking Binaries...\n');

	bin.checkBinaries(() => {

		var flex = `flex -o ${name}.lex.c ${name}.l`,
			bison = `bison -d ${verbose} ${name}.y`,
			gcc = `gcc ${name}.lex.c ${name}.tab.c ${compile} -o ${name}`,
			exe = `echo ${input} > temp && ${name} < temp`;

		if (file)
			exe = `${name} < ${file}`;

		console.log(' Building...\n');

		util.cmd(bison, () => {

			console.log(' \u2713 Bison');

			util.cmd(flex, () => {

				console.log(' \u2713 Flex');

				util.cmd(gcc, () => {

					console.log(' \u2713 GCC\n');

					if (onlyCompile)
						util.clear(name, false);

					else {

						util.cmd(exe, () =>
							util.clear(name, true)
						);

					}
				});
			});
		});
	});
};

var help = () => {
	console.log(' Commands:\n');
	console.log(' - bs new <name>\t\t create project folder/files');
	console.log(' - bs init\t\t\t generate flex and bison template');
	console.log(' - bs run <expression> <flags>\t run bison,flex, gcc and executable (string input)');
	console.log(' - bs --v \t\t\t CLI info.');
	console.log('\n ====== run flags ====== \n');
	console.log(' -file \t\t-f\t\t Use a file as input.');
	console.log(' -compile \t-c\t\t Add other files that should be compiled.');
	console.log(' -only \t\t-o\t\t Compile but not run executable.');
	console.log(' -verbose \t-v\t\t Bison -v flag.');
	console.log(' -watch \t-w\t\t Build/Run on files change.');
	console.log(' -d \t\t\t\t Use default input file (in.txt).');
};

var version = () => {
	var pkg = require('../package.json');
	console.log(` - version:\t ${pkg.version}`);
	console.log(` - author:\t ${pkg.author.name}`);
};

exports.run = run;
exports.fnit = fnit;
exports.init = init;
exports.help = help;
exports.version = version;