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
		console.log("- " + item.file);
		errors++;
		fs.writeFile(item.path, beautifiedContent, "utf-8", callback);
	} else {
		ok++;
		callback();
	}
}, function(err) {
	if(err) throw err;
	if(errors) {
		console.log("Done. (" + errors + " files updated, " + (errors + ok) + " files checked)");
	} else {
		console.log("Done. (" + ok + " files checked)");
	}
});
