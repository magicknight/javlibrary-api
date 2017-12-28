'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* global describe it */

var assert = require('assert');
var getBestReviews = require('../lib/getBestReviews');
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
                "text": {
                    "type": "string"
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
                }
            },
            "required": ["id", "name", "date", "length", "director", "directorID", "maker", "makerID", "label", "labelID", "rate", "text", "cover"]
        }
    },

    "type": "object",
    "additionalProperties": false,
    "properties": {
        "size": {
            "type": "number"
        },
        "list": {
            "type": "array",
            "items": { "$ref": "#/definitions/item" }
        }
    },
    "required": ["list", "size"]
};
var ajv = new require('ajv')();

ajv.addSchema(schema, 'getBestReviews');

describe('getBestReviews', function () {
    it('parser best reviews results', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var results, valid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getBestReviews();

                    case 2:
                        results = _context.sent;
                        valid = ajv.validate('getBestReviews', results);


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

    it('parser best reviews results order by all', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var results, valid;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return getBestReviews({ order: 2 });

                    case 2:
                        results = _context2.sent;
                        valid = ajv.validate('getBestReviews', results);


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