
var getBestReviews = require('../lib/getBestReviews');

(
    async() => {
        var list = getBestReviews();

        for (let i in list) {
            console.log(i);
        }
    }
)();
