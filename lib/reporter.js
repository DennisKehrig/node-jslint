/*jslint forin: true */

var color = require("./color");
var log = console.log;

exports.report = function (file, lint, colorize, terse) {
    'use strict';

    var options = [], key, value, line,
        i, len, pad, e, fileMessage;

    for (key in lint.options) {
        value = lint.options[key];
        options.push(key + ": " + value);
    }

    fileMessage = "\n" + ((colorize) ? color.bold(file) : file);

    if (!lint.ok) {
        if (terse) {
            len = lint.errors.length;
            for (i = 0; i < len; i += 1) {
                e = lint.errors[i];
                if (e) {
                    log(file + '(' + e.line + '):' + e.reason);
                }
            }
        } else {
            //log(fileMessage);
            len = lint.errors.length;
            for (i = 0; i < len; i += 1) {
                e = lint.errors[i];
                if (e) {
                    log("File \"" + file + "\", line " + e.line);
                    log(((colorize) ? color.yellow(e.reason) : e.reason));
                    log('    ' + (e.evidence || '').replace(/^\s+|\s+$/, ""));
                }
            }
        }
    } else {
        log(fileMessage + " is " + ((colorize) ? color.green('OK') : 'OK') + ".");
    }

    return lint.ok;
};
