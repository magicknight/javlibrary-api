
var jav = require('./createInstance')();

(
    async() => {
        var res = await jav.listByTag({ id: 'ae' });
        console.log(res.next);
    }
)();
