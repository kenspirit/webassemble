/*
 * grunt-webassemble
 * https://github.com/kenspirit/grunt-webassemble
 *
 * Copyright (c) 2013 Ken Chen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'lib/*.js',
                'test/src/*.js',
                '<%= nodeunit.all %>'
            ],
            options: {
                jshintrc: 'jshint_config.json'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['test/output/*']
        },

        // Configuration to be run (and then tested).
        webassemble: {
            realUsage: {
                options: {
                    name: 'wa'
                },
                files: [
                    {src: ['test/src/date-util.js', 'test/src/string-util.js'], dest: 'test/output/gruntRealUsage.js'}
                ]
            },
            fullSample: {
                options: {
                    amd: true,
                    name: 'full'
                },
                files: [
                    {src: ['test/src/module_exports_*.js'], dest: 'test/output/gruntFullSample.js'}
                ]
            }
        },

        // Unit tests.
        nodeunit: {
            all: ['test/*_test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "output" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'webassemble', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
