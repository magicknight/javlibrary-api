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
    list: [
        {
            id: 'ayuf2',
            name: '園田みおん',
            avatar: 'i.imgur.com/UO4uBwj.jpg',
        },
        ...
    ],

    size: 20,
 }
 * */

/**
 * Get the most favorited items
 *
 * @returns {object|undefined} A object the if successful. If failure not returned.
 * */
var getMostFavStars = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var request, response, $, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        request = (0, _request.createRequest)();
                        _context.next = 4;
                        return request.get('' + _helper.URL_MOSTFAVSTAR);

                    case 4:
                        response = _context.sent;
                        $ = _cheerio2.default.load(response, {
                            decodeEntities: false
                        });
                        data = _scrapeIt2.default.scrapeHTML($, {
                            list: {
                                listItem: '.searchitem[id]',
                                data: {
                                    id: {
                                        attr: 'id'
                                    },
                                    name: {
                                        selector: 'img',
                                        attr: 'title'
                                    },
                                    avatar: {
                                        selector: 'img',
                                        attr: 'src',
                                        convert: function convert(x) {
                                            return (0, _helper.getLink)(x.substring(2, x.length));
                                        }
                                    }
                                }
                            }
                        });


                        data.size = data.list.length;
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

    return function getMostFavStars() {
        return _ref.apply(this, arguments);
    };
}();

module.exports = getMostFavStars;