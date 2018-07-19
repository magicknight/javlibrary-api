
var jav = require('./createInstance')();

(
    async() => {
        var res = await jav.getBestReviews();
        console.log(res.size);
    }
)();
