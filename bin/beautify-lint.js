#!/usr/bin/env node

var forEachBeautifiedFile = require("../lib/forEachBeautifiedFile");
var fs = require("fs");
var path = require("path");
var diff = require("diff");

var files = process.argv.slice(2);

var settings = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), ".jsbeautifyrc"), "utf-8")).js;

var errors = 0;
var ok = 0;

forEachBeautifiedFile({
	cwd: process.cwd(),
	files: files,
	settings: settings
}, function(item, callback) {
	var content = item.content;
	var beautifiedContent = item.beautifiedContent;
	if(content !== beautifiedContent) {
		console.log(diff.createPatch(item.file, content, beautifiedContent));
		console.log();
		errors++;
	} else {
		ok++;
	}
	callback();
}, function(err) {
	if(err) throw err;
	if(errors) {
		console.log(errors + " Errors. (" + (errors + ok) + " files checked)");
		process.exit(1); // eslint-disable-line
	} else {
		console.log("Fine. (" + ok + " files checked)");
		process.exit(0); // eslint-disable-line
	}
});
