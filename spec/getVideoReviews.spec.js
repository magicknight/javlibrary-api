
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
                "location": { "type": "string" },
            },
            "required": [ "date", "content", "username", "location" ]
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
        var results = await jav.getVideoReviews('javliida3q');
        var valid = ajv.validate('getVideoReviews', results);

        if (!valid) {
            console.error(results);
            console.error(ajv.errorsText());
        }

        assert.equal(
            valid,
            true,
        );
    });
});
