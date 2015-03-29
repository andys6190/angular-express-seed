'use strict';

var _  = require('lodash');
var fs = require('fs');
var q  = require('q');

var replaceLinesInFile = function(filePath, startPattern, endPattern, linesArray) {
	var deferred = q.defer();
	fs.readFile(filePath, 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}

		var regex = new RegExp('([ \\t\\r]*)' + startPattern + '[\\s\\S]*' + endPattern, 'g');
		var whitespace = regex.exec(data)[1];
		var replacementContent = linesArray.map(function(line) {
			return whitespace + line;
		}).join('\n');
		var fullReplacement = whitespace + startPattern + '\n' + replacementContent + '\n' + whitespace + endPattern;
		var newFileContent = data.replace(regex, fullReplacement);

		fs.writeFile(filePath, newFileContent, 'utf8', function(err) {
			if (err) {
				return console.log(err);
			}
			deferred.resolve();
		});
	});
	return deferred.promise;
};

module.exports = function(grunt) {
	grunt.registerMultiTask('buildAssets', '', function() {
		var done 			      = this.async();
		var options 		      = this.options();
		var dependencies 	      = this.data.assets;
        var dependencyDefinitions = [];

		_.each(dependencies, function(dependencyPatterns, type) {
            _.each(dependencyPatterns, function(dependencyPattern) {
                _.each(grunt.file.expand(dependencyPattern), function(dependency) {
                    var cleanDependency = dependency.replace(new RegExp(options.ignoreRegex), '');
                    if (type in options.templates) {
                        var htmlTag = options.templates[type].replace('{filePath}', cleanDependency);
                        dependencyDefinitions.push(htmlTag);
                    }
                });
            });
		});

        if (dependencyDefinitions.length > 0) {
            if (options.replaceFile) {
                fs.writeFile(options.index, dependencyDefinitions.join('\n'));
                done();
            } else {
                replaceLinesInFile(options.index, '//assets', '//end assets', dependencyDefinitions).then(function() {
                    done();
                });
            }
        }
	});
};
