
/* global describe it */

var jav = require('../sample/createInstance')();
var assert = require('assert');
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
                "text": {
                    "type": "string",
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
            },
            "required": [ "id", "name", "date", "length", "director", "directorID", "maker", "makerID", "label", "labelID", "rate", "text", "cover" ]
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

ajv.addSchema(schema, 'getBestReviews');

describe('getBestReviews', function() {
    it('parser best reviews results', async function() {
        var results = await jav.getBestReviews();
        var valid = ajv.validate('getBestReviews', results);

        if (!valid) {
            console.error(results);
            console.error(ajv.errorsText());
        }

        assert.strictEqual(
            valid,
            true,
        );
    });

    it('parser best reviews results order by all', async function() {
        var results = await jav.getBestReviews({ order: 2 });
        var valid = ajv.validate('getBestReviews', results);

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
