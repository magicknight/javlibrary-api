
var jav = require('./createInstance')();

(
    async() => {
        console.log(await jav.search('abp 516'));
        console.log(await jav.search('midd 751'));
    }
)();
