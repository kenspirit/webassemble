'use strict';

var grunt = require('grunt'),
    findExports = require('../lib/findExports');

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

exports.findExports = {
    setUp: function (done) {
        this.IS_EXPORTS_PROPERTY = true;
        this.ERR_MSG_AS_PROPERTY = ' should be exported as property.';
        this.ERR_MSG_NOT_AS_PROPERTY = ' should NOT be exported as property.';
        done();
    },
    date_util: function (test) {
        test.expect(1);

        var exports = findExports(grunt.file.read('test/src/date-util.js'));
        test.ok(exports.DateUtil, 'DateUtil' + this.ERR_MSG_AS_PROPERTY);

        test.done();
    },
    string_util: function (test) {
        test.expect(1);

        var exports = findExports(grunt.file.read('test/src/string-util.js'));
        test.ok(exports.StringUtil, 'StringUtil' + this.ERR_MSG_AS_PROPERTY);

        test.done();
    },
    constants: function (test) {
        test.expect(1);

        var exports = findExports(grunt.file.read('test/src/constants.js'));
        test.ok(exports.CONSTANTS === false, 'Constants' + this.ERR_MSG_NOT_AS_PROPERTY);

        test.done();
    },
    module_exports_abc: function (test) {
        test.expect(3);

        var exports = findExports(grunt.file.read('test/src/module_exports_abc.js'));
        test.ok(exports.funA, 'funA' + this.ERR_MSG_AS_PROPERTY);
        test.ok(exports.funB, 'funB' + this.ERR_MSG_AS_PROPERTY);
        test.ok(exports.funC, 'funC' + this.ERR_MSG_AS_PROPERTY);

        test.done();
    },
    module_exports_d: function (test) {
        test.expect(1);

        var exports = findExports(grunt.file.read('test/src/module_exports_d.js'));
        test.ok(exports.funD === false, 'funD' + this.ERR_MSG_NOT_AS_PROPERTY);

        test.done();
    },
    module_exports_e: function (test) {
        test.expect(1);

        var exports = findExports(grunt.file.read('test/src/module_exports_e.js'));
        test.ok(exports.funE === false, 'funE' + this.ERR_MSG_NOT_AS_PROPERTY);

        test.done();
    },
    module_exports_f: function (test) {
        test.expect(1);

        var exports = findExports(grunt.file.read('test/src/module_exports_f.js'));
        test.ok(exports.funF === false, 'funF' + this.ERR_MSG_NOT_AS_PROPERTY);

        test.done();
    },
    module_exports_g: function (test) {
        test.expect(1);

        var exports = findExports(grunt.file.read('test/src/module_exports_g.js'));
        test.ok(exports.funG === false, 'funG' + this.ERR_MSG_NOT_AS_PROPERTY);

        test.done();
    }
};
