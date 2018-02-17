'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* global describe it */

var assert = require('assert');
var getPopularVideo = require('../lib/getPopularVideo');
var schema = {
    "definitions": {
        "item": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "id": { "type": "string" },
                "no": { "type": "string" },
                "name": { "type": "string" },
                "cover": {
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                        "small": {
                            "type": "string",
                            "format": "uri"
                        },
                        "large": {
                            "type": "string",
                            "format": "uri"
                        }
                    },
                    "required": ["small", "large"]
                }
            },
            "required": ["id", "no", "name", "cover"]
        }
    },

    "type": "object",
    "additionalProperties": false,
    "properties": {
        "next": {
            "type": "boolean"
        },
        "list": {
            "type": "array",
            "items": { "$ref": "#/definitions/item" }
        }
    },
    "required": ["list", "next"]
};
var ajv = new require('ajv')();

ajv.addSchema(schema, 'getPopularVideo');

describe('getPopularVideo', function () {
    it('parser popular video results', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var results, valid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getPopularVideo();

                    case 2:
                        results = _context.sent;
                        valid = ajv.validate('getPopularVideo', results);


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