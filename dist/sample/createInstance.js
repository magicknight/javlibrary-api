'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var jav = require('../index');
var fs = require('fs');
var path = require('path');

module.exports = function () {
    var session = fs.readFileSync(path.resolve(__dirname, '../session.txt'), { encoding: 'utf-8' });

    var _session$split = session.split(':'),
        _session$split2 = _slicedToArray(_session$split, 2),
        cookie = _session$split2[0],
        userAgent = _session$split2[1];

    jav.config({
        headers: {
            'User-Agent': userAgent.trim(),
            'Cookie': cookie.trim()
        }
    });

    return jav;
};