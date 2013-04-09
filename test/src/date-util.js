'use strict';

var StringUtil = require('./string-util.js').StringUtil;

var DateUtil = (function () {
    var lPadZero = function (num) {
        return num < 10 ? '0' + num : num;
    };

    var DATE_ELEMENT_SEPARATOR = '/';

    return {
        DATE_FORMAT: 'yy' + DATE_ELEMENT_SEPARATOR + 'mm' + DATE_ELEMENT_SEPARATOR + 'dd',

        formatDate: function (date) {
            if (!(date instanceof Date)) {
                return date;
            }
            return date.getFullYear() + DATE_ELEMENT_SEPARATOR +
                lPadZero(date.getMonth() + 1) + DATE_ELEMENT_SEPARATOR +
                lPadZero(date.getDate());
        },

        formatTime: function (date) {
            if (!(date instanceof Date)) {
                return date;
            }

            return lPadZero(date.getHours()) + ':' + lPadZero(date.getMinutes());
        },

        getDate: function (date) {
            if (StringUtil.isBlank(date)) {
                return null;
            }
            return date.split(' ')[0];
        },

        getTime: function (date) {
            if (StringUtil.isBlank(date)) {
                return null;
            }
            return date.split(' ')[1];
        }
    };
})();

exports.DateUtil = DateUtil;
