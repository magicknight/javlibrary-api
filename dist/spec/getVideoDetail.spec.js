'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* global describe it */

var assert = require('assert');
var getVideoDetail = require('../lib/getVideoDetail');
var schema = {
    "definitions": {
        "item": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                }
            },
            "required": ["id", "name"]
        }
    },
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "id": {
            "type": "string"
        },
        "no": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "date": {
            "type": "string"
        },
        "length": {
            "type": "number"
        },
        "director": {
            "oneOf": [{
                "type": "string"
            }, {
                "type": "null"
            }]
        },
        "directorID": {
            "type": "string"
        },
        "maker": {
            "oneOf": [{
                "type": "string"
            }, {
                "type": "null"
            }]
        },
        "makerID": {
            "type": "string"
        },
        "label": {
            "oneOf": [{
                "type": "string"
            }, {
                "type": "null"
            }]
        },
        "labelID": {
            "type": "string"
        },
        "rate": {
            "type": "number"
        },
        "cover": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "small": {
                    "type": "string"
                },
                "large": {
                    "type": "string"
                }
            },
            "required": ["small", "large"]
        },
        "tags": {
            "type": "array",
            "items": { "$ref": "#/definitions/item" }
        },
        "stars": {
            "type": "array",
            "items": { "$ref": "#/definitions/item" }
        },
        "previews": {
            "type": "array"
        }
    },
    "required": ["id", "name", "date", "length", "director", "directorID", "maker", "makerID", "label", "labelID", "rate", "cover", "tags", "stars", "previews"]
};
var ajv = new require('ajv')();

ajv.addSchema(schema, 'getVideoDetail');

describe('getVideoDetail', function () {
    it('parser video detail results', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var results, valid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getVideoDetail('javliida3q');

                    case 2:
                        results = _context.sent;
                        valid = ajv.validate('getVideoDetail', results);


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