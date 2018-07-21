'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* global describe it */

var jav = require('../sample/createInstance')();
var assert = require('assert');
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
                }
            },
            "required": ["id", "name", "avatar"]
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

ajv.addSchema(schema, 'getMostFavStars');

describe('getMostFavStars', function () {
    it('parser most favorite stars results', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var results, valid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return jav.getMostFavStars();

                    case 2:
                        results = _context.sent;
                        valid = ajv.validate('getMostFavStars', results);


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