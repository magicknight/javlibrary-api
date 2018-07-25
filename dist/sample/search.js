'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jav = require('./createInstance')();

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.t0 = console;
                    _context.next = 3;
                    return jav.search('abp 516');

                case 3:
                    _context.t1 = _context.sent;

                    _context.t0.log.call(_context.t0, _context.t1);

                    _context.t2 = console;
                    _context.next = 8;
                    return jav.search('midd 751');

                case 8:
                    _context.t3 = _context.sent;

                    _context.t2.log.call(_context.t2, _context.t3);

                case 10:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();