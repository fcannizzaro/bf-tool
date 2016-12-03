/* jshint esversion: 6*/

var fs = require("fs");

var read = name => fs.readFileSync("template/" + name).toString();

var templates = {
	logo: read("logo.txt"),
	flex: read("flex.txt"),
	bison: read("bison.txt")
};

var json = JSON.stringify(templates, null, 4);

fs.writeFileSync("../bin/template.json", json, "utf-8");