/*
 * grunt-webassemble
 * https://github.com/kenspirit/grunt-webassemble
 *
 * Copyright (c) 2013 Ken Chen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var webassemble = require('../lib/webassemble'),
        count       = require('es5-ext/lib/Object/count');

    grunt.registerMultiTask('webassemble', 'Assemble module files', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options();

        // Iterate over all specified file groups.
        var done = this.async();
        var time = Date.now();
        this.files.map(function (f) {
            webassemble(f.src, f.dest, options).end(function(parser) {
                // Assemble bundles
                time = Date.now() - time;
                console.log('Done [' + parser.modulesFiles.length + ' modules from ' +
                    count(parser.packages) + ' packages in ' + (time / 1000).toFixed(2) +
                    's]');
                console.log('File ' + f.dest + ' created.');
                done();
            });
        });
    });
};
