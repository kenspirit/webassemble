'use strict';

function dynamicRequire(name) {
    return require('./' + name);
}

exports.dynamicRequire = dynamicRequire;
