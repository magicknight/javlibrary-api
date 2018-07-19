'use strict';

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _scrapeIt = require('scrape-it');

var _scrapeIt2 = _interopRequireDefault(_scrapeIt);

var _request = require('../utils/request');

var _helper = require('../utils/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var debug = (0, _debug3.default)('dev:' + __filename);
var error = (0, _debug3.default)('dev:' + __filename);

/**
 {
    id: 'javli4qtzi',
    name: 'BDA-045 バミューダ5周年記念特別企画 坊主頭の女 波多野結衣',
    date: '2017-10-19',
    length: 137,
    director: 'あばしり一家',
    directorID: 'p4',
    maker: 'バミューダ/妄想族',
    makerID: 'm46a',
    label: 'バミューダ/妄想族',
    labelID: 'arace',
    rate: 7.1,
    cover: {
        small: 'pics.dmm.co.jp/mono/movie/adult/bda045/bda045ps.jpg',
        large: 'pics.dmm.co.jp/mono/movie/adult/bda045/bda045pl.jpg',
    },
 }
 * */
module.exports = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$order = _ref2.order,
            order = _ref2$order === undefined ? 1 : _ref2$order;

        var request, response, $, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        request = (0, _request.createRequest)();
                        _context.next = 4;
                        return request.get(_helper.URL_BESTREVIEWS + '?mode=' + order);

                    case 4:
                        response = _context.sent;
                        $ = _cheerio2.default.load(response, {
                            decodeEntities: false
                        });
                        data = _scrapeIt2.default.scrapeHTML($, {
                            list: {
                                listItem: '#video_comments table[id]',
                                data: {
                                    id: {
                                        selector: 'strong a',
                                        attr: 'href',
                                        convert: function convert(x) {
                                            return (0, _helper.getVideoID)(x);
                                        }
                                    },
                                    name: {
                                        selector: 'strong a',
                                        how: 'html',
                                        convert: function convert(x) {
                                            return _helper2.default.exactly(x);
                                        }
                                    },
                                    date: {
                                        selector: '.videoinfo tr:nth-child(1) td:last-child',
                                        how: 'html'
                                    },
                                    length: {
                                        selector: '.videoinfo tr:nth-child(2) td:last-child',
                                        how: 'html',
                                        convert: function convert(x) {
                                            return parseInt(x);
                                        }
                                    },
                                    director: {
                                        selector: '.videoinfo tr:nth-child(3) td:last-child a',
                                        how: 'html'
                                    },
                                    directorID: {
                                        selector: '.videoinfo tr:nth-child(3) td:last-child a',
                                        attr: 'href',
                                        convert: function convert(x) {
                                            return (0, _helper.getDirectorID)(x);
                                        }
                                    },
                                    maker: {
                                        selector: '.videoinfo tr:nth-child(4) td:last-child a',
                                        how: 'html'
                                    },
                                    makerID: {
                                        selector: '.videoinfo tr:nth-child(4) td:last-child a',
                                        attr: 'href',
                                        convert: function convert(x) {
                                            return (0, _helper.getMakerID)(x);
                                        }
                                    },
                                    label: {
                                        selector: '.videoinfo tr:nth-child(5) td:last-child a',
                                        how: 'html'
                                    },
                                    labelID: {
                                        selector: '.videoinfo tr:nth-child(5) td:last-child a',
                                        attr: 'href',
                                        convert: function convert(x) {
                                            return (0, _helper.getLabelID)(x);
                                        }
                                    },
                                    rate: {
                                        selector: '.videoinfo tr:nth-child(6) td:last-child span',
                                        how: 'html',
                                        convert: function convert(x) {
                                            return +x.substring(1, x.length - 1);
                                        }
                                    },
                                    text: {
                                        selector: '.hidden',
                                        how: 'html'
                                    },
                                    cover: {
                                        selector: '.info + td img',
                                        attr: 'src',
                                        convert: function convert(x) {
                                            return {
                                                small: _helper2.default.getLink(x.substring(2, x.length)),
                                                large: _helper2.default.getLink(x.substring(2, x.length).replace(/ps\./, 'pl.'))
                                            };
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

    return function () {
        return _ref.apply(this, arguments);
    };
}();