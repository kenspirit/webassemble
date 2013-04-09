'use strict';

var StringUtil = (function () {
    return {
        isBlank: function (str) {
            return str === null || typeof(str) === 'undefined' || str.length === 0;
        },

        isNotBlank: function (str) {
            return !this.isBlank(str);
        }
    };
})();

exports.StringUtil = StringUtil;
