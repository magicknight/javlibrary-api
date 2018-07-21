'use strict';

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _scrapeIt = require('scrape-it');

var _scrapeIt2 = _interopRequireDefault(_scrapeIt);

var _request = require('../utils/request');

var _helper = require('../utils/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var debug = (0, _debug3.default)('dev:' + __filename);
var error = (0, _debug3.default)('dev:' + __filename);

/**
 {
    id: 'javliida3q',
    comments: [
        {
            location: '',
            username: '',
            date: '',
            content: '',
        }
    ]
 }
 * */

/**
 * Get the reviews by item id
 *
 * @param {string} id ID of the item
 * @returns {object|undefined} A object the if successful. If failure not returned.
 * */
module.exports = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
        var request, response, $, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        request = (0, _request.createRequest)();
                        _context.next = 4;
                        return request.get('' + _helper.URL_VIDEOREVIEWS + id);

                    case 4:
                        response = _context.sent;
                        $ = _cheerio2.default.load(response, {
                            decodeEntities: false
                        });
                        data = _scrapeIt2.default.scrapeHTML($, {
                            reviews: {
                                listItem: '#video_reviews table[id]',
                                data: {
                                    location: {
                                        selector: '.nickname img',
                                        attr: 'src',
                                        convert: function convert(x) {
                                            var match = x.match(/(\w+).png/);

                                            if (match) {
                                                return match[1];
                                            }
                                        }
                                    },
                                    username: {
                                        selector: '.userid a',
                                        how: 'html'
                                    },
                                    date: {
                                        selector: '.date',
                                        how: 'html'
                                    },
                                    content: {
                                        selector: 'textarea',
                                        how: 'html'
                                    }
                                }
                            }
                        });


                        data.id = id;
                        debug('%O', data);

                        return _context.abrupt('return', data);

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context['catch'](0);

                        error('%O', _context.t0);

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 12]]);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}();