
/* global describe it */

var assert = require('assert');
var listByDirector = require('../lib/listByDirector');
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

ajv.addSchema(schema, 'listByDirector');

describe('listByDirector', function() {
    it('list all video by director', async function() {
        var results = await listByDirector({ id: 'kyda' });
        var valid = ajv.validate('listByDirector', results);

        if (!valid) {
            console.error(ajv.errorsText());
        }

        assert.equal(
            valid,
            true,
        );
    });

    it('list all video by director without next page', async function() {
        var results = await listByDirector({ id: 'kyda', page: 99 });
        var valid = ajv.validate('listByDirector', results);

        if (!valid) {
            console.error(ajv.errorsText());
        }

        assert.equal(
            valid,
            true,
        );
    });
});
