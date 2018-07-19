
var jav = require('./createInstance')();

(
    async() => {
        var res = await jav.search('bbi 142');
        console.log(res);
    }
)();
