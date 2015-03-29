'use strict';
var _ = require('lodash');

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
            	},
                index: 'views/layout.jade'
        	},
        	dev: {
        		assets: assets
        	},
        	prod: {
        		assets: {
                    js: ['dist/app.min.js'],
                    css: ['dist/app.min.css']
                },
                options: {
                    ignoreRegex: '^dist\/',
                }
        	}
        },
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        src: _.flatten(_.values(assets)),
                        dest: 'build'
                    }
                ]
            },
            prod: {
                files: [
                    {
                        expand: true,
                        src: _.flatten(_.values(_.omit(assets, ['css', 'js']))),
                        dest: 'dist'
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
        html2js: {
            options: {
                module: 'templates',
                base: 'app/src'
            },
            dev: {
                src: ['app/src/**/*.tpl.html'],
                dest: 'app/src/templates.js'
            }
        },
        uglify: {
            prod: {
                files: {
                    'dist/app.min.js': assets.js
                }
            }
        },
        cssmin: {
            prod: {
                files: {
                    'dist/app.min.css': assets.css
                }
            }
        },
        watch: {
            assets: {
                files: ['app/src/**/*', 'app/less/**/*'],
                tasks: ['build:dev'],
                options: {
                    livereload: true
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
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('build:dev', [
        'clean:dev',
        'less:dev',
        'html2js:dev',
        'copy:dev',
        'buildAssets:dev'
    ]);

    grunt.registerTask('build:prod', [
        'clean:prod',
        'less:dev',
        'html2js:dev',
        'copy:prod',
        'uglify:prod',
        'cssmin:prod',
        'buildAssets:prod'
    ]);
};
