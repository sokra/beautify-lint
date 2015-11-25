var beautify = require("js-beautify").js_beautify;
var fs = require("fs");
var path = require("path");
var glob = require("glob");
var async = require("async");

module.exports = function forEachBeautifiedFile(options, handler, callback) {

	async.map(options.files, function(filePattern, callback) {
		glob(filePattern, {
			cwd: options.cwd
		}, callback);
	}, function(err, filesArrs) {
		if(err) return callback(err);

		var files = filesArrs.reduce(function(arr, item) {
			return arr.concat(item);
		}, []);

		async.eachLimit(files, 50, function(file, callback) {
			var absPath = path.resolve(options.cwd, file);
			fs.readFile(absPath, "utf-8", function(err, content) {
				if(err) return callback(err);
				content = content.replace(/\r\n?/g, "\n");
				var beautifiedContent = beautify(content, options.settings);
				handler({
					file: file,
					path: absPath,
					content: content,
					beautifiedContent: beautifiedContent
				}, callback);
			});
		}, function(err) {
			if(err) return callback(err);
			callback();
		});
	});
};
