'use strict';

var esprima = require('esprima');
var IS_EXPORTS_PROPERTY = true;

// Executes visitor on the object and its children (recursively).
function traverse(object, visitor) {
    var key, child;

    if (visitor.call(null, object) === false) {
        return;
    }
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}

function checkExportsAssignment(allModules, node) {
    if (node.object.name === 'exports' && node.property.type === 'Identifier') {
        allModules[node.property.name] = IS_EXPORTS_PROPERTY;
    }
}

function checkModuleExportsAssignment(allModules, left, right, isMember) {
    if (left.object.name === 'module' && left.property.name === 'exports') {
        if (right.type === 'Identifier') {
            allModules[right.name] = !!isMember;
        } else if (right.type === 'AssignmentExpression') {
            if (right.left.name === 'exports' && right.right.type === 'Identifier') {
                allModules[right.right.name] = !IS_EXPORTS_PROPERTY;
            }
            if (right.left.type === 'Identifier' && right.left.name !== 'exports') {
                allModules[right.left.name] = !IS_EXPORTS_PROPERTY;
            }
        }
    }
}

function checkMemberExpression(allModules, node) {
    var left = node.left;
    if (left.type === 'MemberExpression') {
        checkExportsAssignment(allModules, left);
        checkModuleExportsAssignment(allModules, left, node.right);
        if (left.object.type === 'MemberExpression') {
            checkModuleExportsAssignment(allModules, left.object, left.property, true);
        }
    }
}

/**
 * If Source code is:
 * <pre>
 *     exports.FunA = xxxx;
 *     module.exports = FunB;
 * </pre>
 * Result will be:
 * <pre>
 * {
       FunA: true,
       FunB: false
   }
 * </pre>
 * @code source code to Analyze
 * @return an object.  Each property name is the name of the exported object analyzed from the code passed in.
 * The true / false value for each property indicates whether exported as a property of the exports object in the source.
 */
module.exports = function (code) {
    var allModules = {};

    traverse(esprima.parse(code), function (node) {
        if (node.type === 'AssignmentExpression' &&
            node.operator === '=') {
            if (node.left) {
                checkMemberExpression(allModules, node);
            }
        }
    });

    return allModules;
};
