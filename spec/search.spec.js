
/* global describe it */

var jav = require('../sample/createInstance')();
var assert = require('assert');
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
    it('search video', async function() {
        var results = await jav.search('bbi 142');
        var valid = ajv.validate('search', results);

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
