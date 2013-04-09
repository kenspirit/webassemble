# webassemble

_Auto bundle CommonJS/Node.js packages for web browsers._

Webassemble utilize [Webmake][] to automatically bundle all CommonJS/Node.js packages to share them for the browser.

The reason of building this is that Webmake needs an JS package as entry point whose exported properties can be shared to the browser and so the responsibility of Webassemble is to automatically collect all exported properties from all JS packages you would like to share to browser as the input for Webmake.  You can think of Webassemble is the preprocessor for Webmake.

For example, I have two utility classes would like to share between my Node.js application and browser processing.

_date-util.js_

```javascript
'use strict';

var StringUtil = require('./string-util.js').StringUtil;

var DateUtil = (function () {
    return {
        DATE_FORMAT: 'yy' + DATE_ELEMENT_SEPARATOR + 'mm' + DATE_ELEMENT_SEPARATOR + 'dd',

        getDate: function (date) {
            if (StringUtil.isBlank(date)) {
                return null;
            }
            return date.split(' ')[0];
        }
    };
})();

exports.DateUtil = DateUtil;

```

_string-util.js_

```javascript
'use strict';

var StringUtil = (function () {
    return {
        isBlank: function (str) {
            return str === null || typeof(str) === 'undefined' || str.length === 0;
        }
    };
})();

exports.StringUtil = StringUtil;

```

If I use the date-util.js as input for Webmake, only DateUtil will be exported.  If I would like to export StringUtil too, I need to explicitly write a dummy package to requre and export both DateUtil and StringUtil.

Webassemble is made to write the dummy package for you.

## How does it work?

Let's say if you would like to export above two packages to a file named _bundles.js_, you can execute below command:

    $ webassemble date-util.js string-util.js bundles.js

It will generate a preprocess file as below.  This file is actually the input file for Webmake.  
_bundles-pre.js_

```javascript
exports.DateUtil = require('./date-util');

exports.StringUtil = require('./string-util');
```

## Installation

    $ npm install -g webassemble

## Usage

### Run from shell:

    $ webassemble <input> <output> [options]

__input__ - JS package files to be included in the preprocess file for Webmake.  Can be multiple.  
__output__ - Output filename.  
__options__ - All options Webmake can accept and some extra options listed below.

#### Extra Options  

##### returnContentOnly `boolean`  

Only return the preprocess file content without

##### preProcessOnly `boolean`  

Only write the preprocess file content without calling webmake

### Call programmatically:

```javascript
webassemble(srcFiles, destFile[, options]);
```

If no destFile is provided or returnContentOnly is set to be true, the preprocess file content will be returned.

## Tests [![Build Status](https://secure.travis-ci.org/kenspirit/webassemble.png?branch=master)](https://secure.travis-ci.org/kenspirit/webassemble)

    $ npm test

[Webmake]: https://github.com/medikoo/modules-webmake
