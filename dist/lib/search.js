'use strict';

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _helper = require('../utils/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var error = (0, _debug3.default)('dev:' + __filename);

/**
 {
    keywords: 'bbi142',
    jav: 'javlija45u',
 }
 * */
module.exports = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(keywords) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        keywords = keywords.split(' ').join('+');

                        return _context.abrupt('return', new Promise(function (resolve) {
                            try {
                                var r = _request2.default.get('' + _helper.URL_SEARCH + keywords, function () {
                                    var href = r.uri.href;
                                    var matched = href.match(/v=(jav\w+)$/);

                                    if (matched) {
                                        resolve({
                                            keywords: keywords,
                                            jav: matched[1]
                                        });
                                    } else {
                                        resolve(false);
                                    }
                                });
                            } catch (ex) {
                                error(ex);
                                resolve(false);
                            }
                        }));

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}();