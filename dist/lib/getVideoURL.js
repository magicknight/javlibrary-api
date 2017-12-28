'use strict';

var parse = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(uri) {
        var response, $, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _request2.default.get({
                            baseUrl: '',
                            uri: uri
                        });

                    case 3:
                        response = _context.sent;
                        $ = _cheerio2.default.load(response, {
                            decodeEntities: false
                        });
                        data = _scrapeIt2.default.scrapeHTML($, {
                            src: {
                                selector: '#video-player source',
                                attr: 'src'
                            }
                        });
                        return _context.abrupt('return', data.src);

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](0);

                        error('%O', _context.t0);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 9]]);
    }));

    return function parse(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _scrapeIt = require('scrape-it');

var _scrapeIt2 = _interopRequireDefault(_scrapeIt);

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var debug = (0, _debug3.default)('dev:' + __filename);
var error = (0, _debug3.default)('dev:' + __filename);

module.exports = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(no) {
        var response, video;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _request2.default.get({
                            baseUrl: '',
                            uri: 'https://api.avgle.com/v1/search/' + no + '/0',
                            json: true
                        });

                    case 3:
                        response = _context2.sent;

                        if (!(response.success && response.response && response.response.videos.length)) {
                            _context2.next = 12;
                            break;
                        }

                        video = response.response.videos[0];


                        debug('Video:\n%O', video);
                        _context2.t0 = video['preview_video_url'];
                        _context2.next = 10;
                        return parse(video['video_url']);

                    case 10:
                        _context2.t1 = _context2.sent;
                        return _context2.abrupt('return', {
                            preview: _context2.t0,
                            src: _context2.t1
                        });

                    case 12:
                        _context2.next = 17;
                        break;

                    case 14:
                        _context2.prev = 14;
                        _context2.t2 = _context2['catch'](0);

                        error('%O', _context2.t2);

                    case 17:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 14]]);
    }));

    return function (_x2) {
        return _ref2.apply(this, arguments);
    };
}();