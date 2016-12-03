/* jshint esversion: 6*/
var spawn = require('child_process').spawnSync;

var check = command => {
	let executable = spawn(command);
	if (!executable.error)
		return command;
	return null;
};

var nullOfList = array => {
	array = array.filter(it => !check(it));
	return array.length > 0;
};

var checkBinaries = cb => {

	if (nullOfList(["flex", "bison", "gcc"]))
		return console.log(`Err : Binaries not found`);

	cb();

};

exports.checkBinaries = checkBinaries;