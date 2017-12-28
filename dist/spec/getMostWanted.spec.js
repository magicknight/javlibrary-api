'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* global describe it */

var assert = require('assert');
var getMostWanted = require('../lib/getMostWanted');
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
            "oneOf": [{
                "type": "object",
                "required": ["page"]
            }, {
                "type": "boolean"
            }]
        },
        "list": {
            "type": "array",
            "items": { "$ref": "#/definitions/item" }
        }
    },
    "required": ["list", "next"]
};
var ajv = new require('ajv')();

ajv.addSchema(schema, 'getMostWanted');

describe('getMostWanted', function () {
    it('parser most wanted results', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var results, valid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getMostWanted();

                    case 2:
                        results = _context.sent;
                        valid = ajv.validate('getMostWanted', results);


                        if (!valid) {
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

    it('parser most wanted results without next page', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var results, valid;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return getMostWanted({ page: 99 });

                    case 2:
                        results = _context2.sent;
                        valid = ajv.validate('getMostWanted', results);


                        if (!valid) {
                            console.error(ajv.errorsText());
                        }

                        assert.equal(valid, true);

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    })));
});