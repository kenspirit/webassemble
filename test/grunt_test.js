'use strict';

var grunt = require('grunt'),
    runInNewContext = require('vm').runInNewContext,
    CONSTANTS = require('./src/constants');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.webassemble = {
    setUp: function (done) {
        this.GEN_MSG = ' should be generated';
        this.CTN_MSG = ' should contain ';
        this.SRC_DIR = 'test/src/';
        this.OUT_DIR = 'test/output/';
        done();
    },
    realUsage: function (test) {
        test.expect(4);

        var expected, content, result,
            outputFileName = 'gruntRealUsage.js';

        expected = grunt.file.exists(this.OUT_DIR + outputFileName);
        test.equal(true, expected, outputFileName + this.GEN_MSG);

        content = grunt.file.read(this.OUT_DIR + outputFileName);
        result = runInNewContext(content, {window: {}});

        test.equal(result.CONSTANTS.DATE_FORMAT, CONSTANTS.DATE_FORMAT, outputFileName + this.CTN_MSG + 'constants.js.');
        test.ok(result.DateUtil, outputFileName + this.CTN_MSG + 'date-util.js.');
        test.ok(result.StringUtil, outputFileName + this.CTN_MSG + 'string-util.js.');

        test.done();
    },
    fullSample: function (test) {
        test.expect(9);

        var expected, content, result,
            outputFileName = 'gruntFullSample.js';

        expected = grunt.file.exists(this.OUT_DIR + outputFileName);
        test.equal(expected, true, outputFileName + this.GEN_MSG);

        content = grunt.file.read(this.OUT_DIR + outputFileName);
        result = runInNewContext(content, {define: function (name, fn) {var a = {}; a[name] = fn(); return a; }}).full;
        test.equal(CONSTANTS.DATE_FORMAT, result.CONSTANTS.DATE_FORMAT, outputFileName + this.CTN_MSG + 'constants.js.');
        test.equal(result.funA(), 'A', outputFileName + this.CTN_MSG + 'module_exports_abc.js.');
        test.equal(result.funB(), 'B', outputFileName + this.CTN_MSG + 'module_exports_abc.js.');
        test.equal(result.funC(), 'C', outputFileName + this.CTN_MSG + 'module_exports_abc.js.');
        test.equal(result.funD(), 'D', outputFileName + this.CTN_MSG + 'module_exports_d.js.');
        test.equal(result.funE(), 'E', outputFileName + this.CTN_MSG + 'module_exports_e.js.');
        test.equal(result.funF(), 'F', outputFileName + this.CTN_MSG + 'module_exports_f.js.');
        test.equal(result.funG(), 'G', outputFileName + this.CTN_MSG + 'module_exports_g.js.');

        test.done();
    },
    sameFolder: function (test) {
        test.expect(6);

        var expected, content, result,
            outputFileName = 'sameOutputFolder.js';

        expected = grunt.file.exists(this.SRC_DIR + outputFileName);
        test.equal(true, expected, outputFileName + this.GEN_MSG);

        content = grunt.file.read(this.SRC_DIR + outputFileName);
        result = runInNewContext(content, {});
        test.ok(result.DateUtil, outputFileName + this.CTN_MSG + 'date-util.js.');
        test.ok(result.StringUtil, outputFileName + this.CTN_MSG + 'string-util.js.');

        outputFileName = 'multipleGruntFiles.js';
        expected = grunt.file.exists(this.OUT_DIR + outputFileName);
        test.equal(true, expected, outputFileName + this.GEN_MSG);

        content = grunt.file.read(this.OUT_DIR + outputFileName);
        result = runInNewContext(content, {});
        test.ok(result.DateUtil, outputFileName + this.CTN_MSG + 'date-util.js.');
        test.ok(result.StringUtil, outputFileName + this.CTN_MSG + 'string-util.js.');

        test.done();
    },
    dynamicRequire: function (test) {
        test.expect(2);

        var expected, content, result,
            outputFileName = 'dynamicRequire.js';

        expected = grunt.file.exists(this.SRC_DIR + outputFileName);
        test.equal(true, expected, outputFileName + this.GEN_MSG);

        content = grunt.file.read(this.OUT_DIR + outputFileName);
        result = runInNewContext(content, {});
        test.equal(result.dynamicRequire('constants.js').DATE_FORMAT, CONSTANTS.DATE_FORMAT, outputFileName + this.CTN_MSG + 'constants.js.');

        test.done();
    }
};
