'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* global describe it */

var assert = require('assert');
var search = require('../lib/search');
var schema = {
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "jav": {
            "type": "string"
        },
        "keywords": {
            "type": "string"
        }
    },
    "required": ["jav", "keywords"]
};
var ajv = new require('ajv')();

ajv.addSchema(schema, 'search');

describe('search', function () {
    it('list all video by tag', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var results, valid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return search('bbi 142');

                    case 2:
                        results = _context.sent;
                        valid = ajv.validate('search', results);


                        if (!valid) {
                            console.error(results);
                            console.error(ajv.errorsText());
                        }

                        assert.equal(valid, true);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    })));
});