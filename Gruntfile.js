'use strict';

module.exports = function(grunt) {
	var assets = grunt.file.readJSON('assets.json');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        buildAssets: {
        	options: {
        		ignoreRegex: '^src\/',
            	templates: {
                    js: 'script(src="/{filePath}")',
                    css: 'link(rel="stylesheet" href="/{filePath}")'
            	}
        	},
        	dev: {
                options: {
            	    index: 'views/layout.jade',
                },
        		assets: assets
        	},
        	prod: {
        		assets: assets,
        		options: {
        			minified: true
        		}
        	}
        },
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        src: assets.js,
                        dest: 'build'
                    },
                    {
                        expand: true,
                        src: assets.css,
                        dest: 'build'
                    },
                    {
                        expand: true,
                        src: assets.img,
                        dest: 'build'
                    },
                    {
                        expand: true,
                        src: assets.fonts,
                        dest: 'build'
                    }
                ]
            }
        },
        less: {
            dev: {
                files: {
                    'app/css/app.css': 'app/less/app.less'
                }
            }
        },
        clean: {
            dev: ['build'],
            prod: ['dist']
        }
    });

    // load local tasks (loads all tasks defined in the tasks directory)
   	grunt.loadTasks('tasks');

    // load npm tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
};
