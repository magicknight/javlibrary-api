
/* global describe it */

var assert = require('assert');
var search = require('../lib/search');
var schema = {
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "jav": {
            "type": "string"
        },
        "keywords": {
            "type": "string"
        },
    },
    "required": [ "jav", "keywords" ]
};
var ajv = new require('ajv')();

ajv.addSchema(schema, 'search');

describe('search', function() {
    it('list all video by tag', async function() {
        var results = await search('bbi 142');
        var valid = ajv.validate('search', results);

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
