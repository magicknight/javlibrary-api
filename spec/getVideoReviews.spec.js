
/* global describe it */

var assert = require('assert');
var getVideoReviews = require('../lib/getVideoReviews');
var schema = {
    "definitions": {
        "item": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "date": { "type": "string" },
                "desc": { "type": "string" },
                "nickname": { "type": "string" },
                "location": { "type": "string" },
            },
            "required": [ "date", "desc", "nickname", "location" ]
        }
    },

    "type": "object",
    "additionalProperties": false,
    "properties": {
        "id": {
            "type": "string",
        },
        "reviews": {
            "type": "array",
            "items": { "$ref": "#/definitions/item" }
        },
    },
    "required": [ "id", "reviews" ]
};
var ajv = new require('ajv')();

ajv.addSchema(schema, 'getVideoReviews');

describe('getVideoReviews', function() {
    it('parser video reviews results', async function() {
        var results = await getVideoReviews('javliida3q');
        var valid = ajv.validate('getVideoReviews', results);

        console.log('%O', results);

        if (!valid) {
            console.error(ajv.errorsText());
        }

        assert.equal(
            valid,
            true,
        );
    });
});
