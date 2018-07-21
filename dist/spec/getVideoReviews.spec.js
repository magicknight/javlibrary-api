'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* global describe it */

var jav = require('../sample/createInstance')();
var assert = require('assert');
var schema = {
    "definitions": {
        "item": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "date": { "type": "string" },
                "content": { "type": "string" },
                "username": { "type": "string" },
                "location": { "type": "string" }
            },
            "required": ["date", "content", "username", "location"]
        }
    },

    "type": "object",
    "additionalProperties": false,
    "properties": {
        "id": {
            "type": "string"
        },
        "reviews": {
            "type": "array",
            "items": { "$ref": "#/definitions/item" }
        }
    },
    "required": ["id", "reviews"]
};
var ajv = new require('ajv')();

ajv.addSchema(schema, 'getVideoReviews');

describe('getVideoReviews', function () {
    it('parser video reviews results', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var results, valid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return jav.getVideoReviews('javliida3q');

                    case 2:
                        results = _context.sent;
                        valid = ajv.validate('getVideoReviews', results);


                        if (!valid) {
                            console.error(results);
                            console.error(ajv.errorsText());
                        }

                        assert.strictEqual(valid, true);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    })));
});