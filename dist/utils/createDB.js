'use strict';

var addStar = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item) {
        var client, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return pool.connect();

                    case 3:
                        client = _context.sent;
                        _context.next = 6;
                        return client.query('\n            insert into\n                stars(name, url, avatar, photos, alias, birthday, cup, height, weight)\n                values($1, $2, $3, $4, $5, $6, $7, $8, $9)\n            returning *\n            ', [item.name, item.url, item.avatar, item.profile.photos, item.profile.alias, item.profile.birthday, item.profile.cpu, item.profile.height, item.profile.weight]);

                    case 6:
                        res = _context.sent;


                        client.release();
                        console.log('Insert \n%O', res.rows[0]);
                        _context.next = 14;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](0);

                        console.error(_context.t0);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 11]]);
    }));

    return function addStar(_x) {
        return _ref.apply(this, arguments);
    };
}();

var parseStar = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
        var response, $, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return (0, _request2.default)({ baseUrl: '', uri: url });

                    case 3:
                        response = _context2.sent;
                        $ = _cheerio2.default.load(response, {
                            decodeEntities: false
                        });
                        data = _scrapeIt2.default.scrapeHTML($, {
                            photos: {
                                listItem: '#pornostar-profil-photos img',
                                data: {
                                    image: {
                                        attr: 'src',
                                        convert: function convert(x) {
                                            return '' + baseURL + x;
                                        }
                                    }
                                }
                            },
                            alias: {
                                listItem: '#pornostar-profil-noms-alternatifs li',
                                data: {
                                    en: {
                                        selector: 'span:first-child',
                                        how: 'html'
                                    },
                                    jp: {
                                        selector: 'span:last-child',
                                        how: 'html'
                                    }
                                }
                            },
                            birthday: {
                                selector: '#pornostar-profil-infos time',
                                attr: 'content'
                            },
                            cup: {
                                selector: '#pornostar-profil-infos p:nth-child(12)',
                                how: 'html',
                                convert: function convert(x) {
                                    var match = (x || '').match(/^cup size: (\w)/);

                                    if (match) {
                                        return match[1];
                                    }
                                }
                            },
                            height: {
                                selector: '#pornostar-profil-infos p[itemprop="height"] span',
                                how: 'html'
                            },
                            weight: {
                                selector: '#pornostar-profil-infos p[itemprop="weight"] span',
                                how: 'html'
                            }
                        });
                        return _context2.abrupt('return', data);

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](0);

                        console.error(_context2.t0);

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 9]]);
    }));

    return function parseStar(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _scrapeIt = require('scrape-it');

var _scrapeIt2 = _interopRequireDefault(_scrapeIt);

var _pg = require('pg');

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var baseURL = 'http://warashi-asian-pornstars.fr';
var pool = new _pg.Pool({
    host: '121.42.149.230',
    port: 5432,
    user: 'postgres',
    password: 'abc123...',
    database: 'vigo',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

module.exports = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        var response, $, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, profile;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return (0, _request2.default)({
                            baseUrl: '',
                            uri: baseURL + '/en/s-2-2/female-pornstars/toutes/all/page/' + page
                        });

                    case 3:
                        response = _context3.sent;
                        $ = _cheerio2.default.load(response, {
                            decodeEntities: false
                        });
                        data = _scrapeIt2.default.scrapeHTML($, {
                            list: {
                                listItem: '.listing-pornostars figure',
                                data: {
                                    name: {
                                        selector: 'img',
                                        attr: 'alt'
                                    },
                                    url: {
                                        selector: 'a',
                                        attr: 'href',
                                        convert: function convert(x) {
                                            return '' + baseURL + x;
                                        }
                                    },
                                    avatar: {
                                        selector: 'img',
                                        attr: 'src',
                                        convert: function convert(x) {
                                            return '' + baseURL + x;
                                        }
                                    }
                                }
                            },
                            next: {
                                selector: '.listing-navigation:first-child li:last-child a',
                                how: 'html',
                                convert: function convert(x) {
                                    var max = +x;

                                    if (page < max) {
                                        return {
                                            page: page + 1
                                        };
                                    }

                                    return false;
                                }
                            }
                        });
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context3.prev = 9;
                        _iterator = data.list[Symbol.iterator]();

                    case 11:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context3.next = 21;
                            break;
                        }

                        item = _step.value;
                        _context3.next = 15;
                        return parseStar(item.url);

                    case 15:
                        profile = _context3.sent;

                        item.profile = profile;

                        addStar(item);

                    case 18:
                        _iteratorNormalCompletion = true;
                        _context3.next = 11;
                        break;

                    case 21:
                        _context3.next = 27;
                        break;

                    case 23:
                        _context3.prev = 23;
                        _context3.t0 = _context3['catch'](9);
                        _didIteratorError = true;
                        _iteratorError = _context3.t0;

                    case 27:
                        _context3.prev = 27;
                        _context3.prev = 28;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 30:
                        _context3.prev = 30;

                        if (!_didIteratorError) {
                            _context3.next = 33;
                            break;
                        }

                        throw _iteratorError;

                    case 33:
                        return _context3.finish(30);

                    case 34:
                        return _context3.finish(27);

                    case 35:

                        if (data.next) {
                            createDB(data.next.page);
                        }
                        _context3.next = 41;
                        break;

                    case 38:
                        _context3.prev = 38;
                        _context3.t1 = _context3['catch'](0);

                        console.error(_context3.t1);

                    case 41:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[0, 38], [9, 23, 27, 35], [28,, 30, 34]]);
    }));

    function createDB() {
        return _ref3.apply(this, arguments);
    }

    return createDB;
}();