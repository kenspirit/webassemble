'use strict';

var grunt = require('grunt');

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
        done();
    },
    realUsage: function (test) {
        test.expect(2);

        var expected = grunt.file.exists('test/output/gruntRealUsage.js');
        test.equal(expected, true, 'gruntRealUsage.js should be generated.');

        var content = grunt.file.read('test/output/gruntRealUsage.js');
        test.ok(content.length > 0, 'gruntRealUsage.js should be generated correctly.');

        test.done();
    },
    fullSample: function (test) {
        test.expect(2);

        var expected = grunt.file.exists('test/output/gruntFullSample.js');
        test.equal(expected, true, 'gruntFullSample.js should be generated.');

        var content = grunt.file.read('test/output/gruntFullSample.js');
        test.ok(content.length > 0, 'gruntFullSample.js should be generated correctly.');        

        test.done();
    }
};
