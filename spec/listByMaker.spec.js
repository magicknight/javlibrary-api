
/* global describe it */

var assert = require('assert');
var listByMaker = require('../lib/listByMaker');
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

ajv.addSchema(schema, 'listByMaker');

describe('listByMaker', function() {
    it('list all video by maker', async function() {
        var results = await listByMaker({ id: 'mzkq' });
        var valid = ajv.validate('listByMaker', results);

        if (!valid) {
            console.error(ajv.errorsText());
        }

        assert.equal(
            valid,
            true,
        );
    });

    it('list all video by maker without next page', async function() {
        var results = await listByMaker({ id: 'mzkq', page: 99 });
        var valid = ajv.validate('listByMaker', results);

        if (!valid) {
            console.error(ajv.errorsText());
        }

        assert.equal(
            valid,
            true,
        );
    });
});
