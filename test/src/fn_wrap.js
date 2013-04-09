'use strict';

var f = function (result) {
    return function () {
        return result;
    };
};

module.exports = f;
