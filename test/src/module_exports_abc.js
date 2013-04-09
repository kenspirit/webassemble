var f = require('./fn_wrap');

exports.funA = f('A');

exports.funB = f('B');

module.exports.funC = f('C');
