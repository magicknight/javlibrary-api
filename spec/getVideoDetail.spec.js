
/* global describe it */

var assert = require('assert');
var getVideoDetail = require('../lib/getVideoDetail');
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
            },
            "required": [ "id", "name" ]
        },
    },
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "id": {
            "type": "string",
        },
        "no": {
            "type": "string",
        },
        "name": {
            "type": "string",
        },
        "date": {
            "type": "string",
        },
        "length": {
            "type": "number",
        },
        "director": {
            "oneOf": [
                {
                    "type": "string",
                },
                {
                    "type": "null",
                }
            ]
        },
        "directorID": {
            "type": "string",
        },
        "maker": {
            "oneOf": [
                {
                    "type": "string",
                },
                {
                    "type": "null",
                }
            ]
        },
        "makerID": {
            "type": "string",
        },
        "label": {
            "oneOf": [
                {
                    "type": "string",
                },
                {
                    "type": "null",
                }
            ]
        },
        "labelID": {
            "type": "string",
        },
        "rate": {
            "type": "number",
        },
        "cover": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "small": {
                    "type": "string",
                },
                "large": {
                    "type": "string",
                },
            },
            "required": [ "small", "large" ]
        },
        "tags": {
            "type": "array",
            "items": { "$ref": "#/definitions/item" }
        },
        "cast": {
            "type": "array",
            "items": { "$ref": "#/definitions/item" }
        },
        "preview": {
            "type": "array",
        },
    },
    "required": [ "id", "name", "date", "length", "director", "directorID", "maker", "makerID", "label", "labelID", "rate", "cover", "tags", "cast", "preview" ]
};
var ajv = new require('ajv')();

ajv.addSchema(schema, 'getVideoDetail');

describe('getVideoDetail', function() {
    it('parser video detail results', async function() {
        var results = await getVideoDetail('javliida3q');
        var valid = ajv.validate('getVideoDetail', results);

        if (!valid) {
            console.error(ajv.errorsText());
        }

        assert.equal(
            valid,
            true,
        );
    });
});
