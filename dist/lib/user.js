'use strict';

var getFavVideo = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cookie) {
        var request, response, $, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        request = (0, _request.createRequest)();
                        _context.prev = 1;
                        _context.next = 4;
                        return request({
                            uri: _helper.URL_FAVVIDEO,
                            headers: {
                                cookie: cookie
                            }
                        });

                    case 4:
                        response = _context.sent;
                        $ = _cheerio2.default.load(response, {
                            decodeEntities: false
                        });
                        data = _scrapeIt2.default.scrapeHTML($, {
                            list: {
                                listItem: '#rightcolumn .videotextlist tr:not(.header)',
                                data: {
                                    id: {
                                        selector: 'a',
                                        attr: 'href',
                                        convert: function convert(x) {
                                            return (0, _helper.getVideoID)(x);
                                        }
                                    },
                                    videoid: {
                                        selector: 'input',
                                        attr: 'value'
                                    },
                                    name: {
                                        selector: 'a',
                                        attr: 'title'
                                    }
                                }
                            }
                        });


                        data.size = data.list.length;
                        debug('%O', data);
                        return _context.abrupt('return', data);

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context['catch'](1);

                        error('%O', _context.t0);

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[1, 12]]);
    }));

    return function getFavVideo(_x) {
        return _ref.apply(this, arguments);
    };
}();

var addFavVideo = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, cookie) {
        var request, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        request = (0, _request.createRequest)();
                        _context2.prev = 1;
                        _context2.next = 4;
                        return request({
                            method: 'POST',
                            baseUrl: '',
                            uri: 'http://www.javlibrary.com/ajax/ajax_vl_favoriteadd.php',
                            headers: {
                                cookie: cookie
                            },
                            form: {
                                id: id,
                                type: 3
                            },
                            json: true
                        });

                    case 4:
                        response = _context2.sent;


                        debug('%O', response);
                        return _context2.abrupt('return', response);

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](1);

                        error('%O', _context2.t0);

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[1, 9]]);
    }));

    return function addFavVideo(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var removeFavVideo = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(videoid, cookie) {
        var request;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        request = (0, _request.createRequest)();
                        _context3.prev = 1;
                        _context3.next = 4;
                        return request({
                            method: 'POST',
                            uri: _helper.URL_REMOVEFAVVIDEO,
                            headers: {
                                cookie: cookie
                            },
                            form: {
                                'edittype': 1,
                                'selectedVideos[]': videoid
                            }
                        });

                    case 4:
                        return _context3.abrupt('return', true);

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3['catch'](1);

                        error('%O', _context3.t0);

                    case 10:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[1, 7]]);
    }));

    return function removeFavVideo(_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();

var getFavStar = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(cookie) {
        var request, response, $, data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        request = (0, _request.createRequest)();
                        _context4.prev = 1;
                        _context4.next = 4;
                        return request({
                            uri: _helper.URL_FAVSTAR,
                            headers: {
                                cookie: cookie
                            }
                        });

                    case 4:
                        response = _context4.sent;
                        $ = _cheerio2.default.load(response, {
                            decodeEntities: false
                        });
                        data = _scrapeIt2.default.scrapeHTML($, {
                            list: {
                                listItem: '#rightcolumn .videotextlist tr:not(.header)',
                                data: {
                                    id: {
                                        selector: 'a',
                                        attr: 'href',
                                        convert: function convert(x) {
                                            return (0, _helper.getCastID)(x);
                                        }
                                    },
                                    castid: {
                                        selector: 'input',
                                        attr: 'value'
                                    },
                                    name: {
                                        selector: 'a',
                                        how: 'html'
                                    }
                                }
                            }
                        });


                        data.size = data.list.length;
                        debug('%O', data);
                        return _context4.abrupt('return', data);

                    case 12:
                        _context4.prev = 12;
                        _context4.t0 = _context4['catch'](1);

                        error('%O', _context4.t0);

                    case 15:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[1, 12]]);
    }));

    return function getFavStar(_x6) {
        return _ref4.apply(this, arguments);
    };
}();

var addFavStar = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, cookie) {
        var request, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        request = (0, _request.createRequest)();
                        _context5.prev = 1;
                        _context5.next = 4;
                        return request({
                            method: 'POST',
                            baseUrl: '',
                            uri: 'http://www.javlibrary.com/ajax/ajax_favoriteadd_star.php',
                            headers: {
                                cookie: cookie
                            },
                            form: {
                                id: id,
                                type: 4
                            },
                            json: true
                        });

                    case 4:
                        response = _context5.sent;


                        debug('%O', response);
                        return _context5.abrupt('return', response);

                    case 9:
                        _context5.prev = 9;
                        _context5.t0 = _context5['catch'](1);

                        error('%O', _context5.t0);

                    case 12:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[1, 9]]);
    }));

    return function addFavStar(_x7, _x8) {
        return _ref5.apply(this, arguments);
    };
}();

var removeFavStar = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(castid, cookie) {
        var request;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        request = (0, _request.createRequest)();
                        _context6.prev = 1;
                        _context6.next = 4;
                        return request({
                            method: 'POST',
                            uri: _helper.URL_REMOVEFAVSTAR,
                            headers: {
                                cookie: cookie
                            },
                            form: {
                                'edittype': 1,
                                'selectedVideos[]': castid
                            }
                        });

                    case 4:
                        return _context6.abrupt('return', true);

                    case 7:
                        _context6.prev = 7;
                        _context6.t0 = _context6['catch'](1);

                        error('%O', _context6.t0);

                    case 10:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[1, 7]]);
    }));

    return function removeFavStar(_x9, _x10) {
        return _ref6.apply(this, arguments);
    };
}();

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

module.exports = {
    getFavVideo: getFavVideo,
    addFavVideo: addFavVideo,
    removeFavVideo: removeFavVideo,
    getFavStar: getFavStar,
    addFavStar: addFavStar,
    removeFavStar: removeFavStar
};