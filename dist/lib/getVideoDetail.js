'use strict';

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _scrapeIt = require('scrape-it');

var _scrapeIt2 = _interopRequireDefault(_scrapeIt);

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

var _helper = require('../utils/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var debug = (0, _debug3.default)('dev:' + __filename);
var error = (0, _debug3.default)('dev:' + __filename);

/**
 {
    id: 'javliida3q',
    no: 'IPZ-462'
    name: 'IPZ-462 Wエロ痴女ナース 過激で刺激的 凄絶な240分',
    date: '2014-10-01',
    length: 240,
    director: 'キョウセイ',
    directorID: 'a4lq',
    maker: 'IDEA POCKET',
    makerID: 'aq4q',
    label: 'ティッシュ',
    labelID: 'buwq',
    rate: 9.1,
    cover: {
        small: 'pics.dmm.co.jp/mono/movie/adult/bda045/bda045ps.jpg',
        large: 'pics.dmm.co.jp/mono/movie/adult/bda045/bda045pl.jpg',
    },
    tags: [
        {
            name: '',
            id: '',
        },
    ],
    cast: [
        {
            name: '',
            id: '',
        }
    ],
    preview: [
        '', '', '',
    ],
 }
 * */
module.exports = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
        var response, $, data, _id, preview, length, image;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _request2.default.get('' + _helper.URL_VIDEODETAIL + id);

                    case 3:
                        response = _context.sent;
                        $ = _cheerio2.default.load(response, {
                            decodeEntities: false
                        });
                        data = _scrapeIt2.default.scrapeHTML($, {
                            no: {
                                selector: '#video_id .text',
                                how: 'html'
                            },
                            name: {
                                selector: '#video_title a',
                                how: 'html'
                            },
                            date: {
                                selector: '#video_date td.text',
                                how: 'html'
                            },
                            length: {
                                selector: '#video_length span.text',
                                how: 'html',
                                convert: function convert(x) {
                                    return parseInt(x);
                                }
                            },
                            director: {
                                selector: '#video_director a',
                                how: 'html'
                            },
                            directorID: {
                                selector: '#video_director a',
                                attr: 'href',
                                convert: function convert(x) {
                                    return (0, _helper.getDirectorID)(x);
                                }
                            },
                            maker: {
                                selector: '#video_maker a',
                                how: 'html'
                            },
                            makerID: {
                                selector: '#video_maker a',
                                attr: 'href',
                                convert: function convert(x) {
                                    return (0, _helper.getMakerID)(x);
                                }
                            },
                            label: {
                                selector: '#video_label a',
                                how: 'html'
                            },
                            labelID: {
                                selector: '#video_label a',
                                attr: 'href',
                                convert: function convert(x) {
                                    return (0, _helper.getLabelID)(x);
                                }
                            },
                            rate: {
                                selector: '#video_review .score',
                                how: 'html',
                                convert: function convert(x) {
                                    return +x.substring(1, x.length - 1);
                                }
                            },
                            tags: {
                                listItem: '#video_genres a',
                                data: {
                                    name: {
                                        how: 'html'
                                    },
                                    id: {
                                        attr: 'href',
                                        convert: function convert(x) {
                                            return (0, _helper.getTagID)(x);
                                        }
                                    }
                                }
                            },
                            cast: {
                                listItem: '#video_cast .star a',
                                data: {
                                    name: {
                                        how: 'html'
                                    },
                                    id: {
                                        attr: 'href',
                                        convert: function convert(x) {
                                            return (0, _helper.getCastID)(x);
                                        }
                                    }
                                }
                            },
                            cover: {
                                selector: '#video_jacket_img',
                                attr: 'src',
                                convert: function convert(x) {
                                    return {
                                        small: x.substring(2, x.length).replace(/pl\./, 'ps.'),
                                        large: x.substring(2, x.length)
                                    };
                                }
                            },
                            preview: {
                                listItem: '.previewthumbs img',
                                data: {
                                    img: {
                                        attr: 'src',
                                        convert: function convert(x) {
                                            return {
                                                small: x,
                                                large: (0, _helper.getLargeImage)(x)
                                            };
                                        }
                                    }
                                }
                            }
                        });


                        if (data.preview.length === 0 && data.cover.small.startsWith('pics.dmm.co.jp')) {
                            _id = data.cover.small.split('/')[4].replace(/(\d{3})$/, '00$1');
                            preview = [];


                            for (length = 10; length > 0;) {
                                image = 'pics.dmm.co.jp/digital/video/' + _id + '/' + _id + '-' + length-- + '.jpg';


                                preview.push({
                                    small: image,
                                    large: (0, _helper.getLargeImage)(image)
                                });
                            }

                            data.preview = preview.reverse();
                            debug('Get Previews:\n%O', preview);
                        }

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