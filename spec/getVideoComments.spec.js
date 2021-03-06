
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
        "comments": {
            "type": "array",
            "items": { "$ref": "#/definitions/item" }
        },
    },
    "required": [ "id", "comments" ]
};
var ajv = new require('ajv')();

ajv.addSchema(schema, 'getVideoComments');

describe('getVideoComments', function() {
    it('parser video comments results', async function() {
        var results = await jav.getVideoComments('javliida3q');
        var valid = ajv.validate('getVideoComments', results);

        if (!valid) {
            console.error(results);
            console.error(ajv.errorsText());
        }

        assert.strictEqual(
            valid,
            true,
        );
    });
});
