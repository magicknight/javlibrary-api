
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

ajv.addSchema(schema, 'listByLabel');

describe('listByLabel', function() {
    it('list all video by label', async function() {
        var results = await jav.listByLabel({ id: 'deka' });
        var valid = ajv.validate('listByLabel', results);

        if (!valid) {
            console.error(results);
            console.error(ajv.errorsText());
        }

        assert.equal(
            valid,
            true,
        );
    });

    it('list all video by label without next page', async function() {
        var results = await jav.listByLabel({ id: 'deka', page: 99 });
        var valid = ajv.validate('listByLabel', results);

        if (!valid) {
            console.error(ajv.errorsText());
        }

        assert.equal(
            valid,
            true,
        );
    });
});
