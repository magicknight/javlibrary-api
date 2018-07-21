
/* global describe it */

var jav = require('../sample/createInstance')();
var assert = require('assert');
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
                            "format": "uri",
                        },
                        "large": {
                            "type": "string",
                            "format": "uri",
                        },
                    },
                    "required": [ "small", "large" ]
                },
            },
            "required": [ "id", "no", "name", "cover" ]
        }
    },

    "type": "object",
    "additionalProperties": false,
    "properties": {
        "next": {
            "oneOf": [
                {
                    "type": "object",
                    "required": [ "page" ]
                },
                {
                    "type": "boolean"
                }
            ]
        },
        "list": {
            "type": "array",
            "items": { "$ref": "#/definitions/item" }
        },
    },
    "required": [ "list", "next" ]
};
var ajv = new require('ajv')();

ajv.addSchema(schema, 'getMostWanted');

describe('getMostWanted', function() {
    it('parser most wanted results', async function() {
        var results = await jav.getMostWanted();
        var valid = ajv.validate('getMostWanted', results);

        if (!valid) {
            console.error(results);
            console.error(ajv.errorsText());
        }

        assert.strictEqual(
            valid,
            true,
        );
    });

    it('parser most wanted results without next page', async function() {
        var results = await jav.getMostWanted({ page: 99 });
        var valid = ajv.validate('getMostWanted', results);

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
