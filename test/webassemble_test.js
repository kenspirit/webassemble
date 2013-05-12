'use strict';

var webassemble = require('../lib/webassemble'),
    DateUtil = require('./src/date-util').DateUtil,
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
        this.MSG = ' should be exported correctly.';
        done();
    },
    realUsage: function (test) {
        test.expect(2);

        webassemble(['test/src/date-util.js', 'test/src/string-util.js'], 'test/output/realUsage.js', {preProcessOnly: true});
        var exported = require('./output/realUsage-pre.js');
        test.equal(exported.DateUtil.DATE_FORMAT, DateUtil.DATE_FORMAT, 'DateUtil' + this.MSG);
        test.ok(exported.StringUtil.isBlank(null), 'StringUtil' + this.MSG);

        test.done();
    },
    fullSample: function (test) {
        test.expect(8);

        webassemble(['test/src/constants.js', 'test/src/module_exports_abc.js', 'test/src/module_exports_d.js',
            'test/src/module_exports_e.js', 'test/src/module_exports_f.js',
            'test/src/module_exports_g.js'], 'test/output/fullSample.js', {preProcessOnly: true});

        var exported = require('./output/fullSample-pre.js');
        test.equal(exported.funA(), 'A', 'funA' + this.MSG);
        test.equal(exported.funB(), 'B', 'funB' + this.MSG);
        test.equal(exported.funC(), 'C', 'funC' + this.MSG);
        test.equal(exported.funD(), 'D', 'funD' + this.MSG);
        test.equal(exported.funE(), 'E', 'funE' + this.MSG);
        test.equal(exported.funF(), 'F', 'funF' + this.MSG);
        test.equal(exported.funG(), 'G', 'funG' + this.MSG);
        test.equal(exported.CONSTANTS.DATE_FORMAT, CONSTANTS.DATE_FORMAT, 'CONSTANTS' + this.MSG);
        test.done();
    }
};
