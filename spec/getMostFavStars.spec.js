
/* global describe it */

var assert = require('assert');
var getMostFavStars = require('../lib/getMostFavStars');
var schema = {
    "definitions": {
        "item": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                },
                "name": {
                    "type": "string",
                },
                "date": {
                    "type": "string",
                },
            },
            "required": [ "id", "name", "avatar" ],
        },
    },

    "type": "object",
    "additionalProperties": false,
    "properties": {
        "size": {
            "type": "number",
        },
        "list": {
            "type": "array",
            "items": { "$ref": "#/definitions/item" }
        },
    },
    "required": [ "list", "size" ]
};
var ajv = new require('ajv')();

ajv.addSchema(schema, 'getMostFavStars');

describe('getMostFavStars', function() {
    it('parser most favorite stars results', async function() {
        var results = await getMostFavStars();
        var valid = ajv.validate('getMostFavStars', results);

        if (!valid) {
            console.error(ajv.errorsText());
        }

        assert.equal(
            valid,
            true,
        );
    });
});
