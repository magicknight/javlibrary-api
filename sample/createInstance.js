
var jav = require('../index');
var fs = require('fs');
var path = require('path');

module.exports = () => {
    var session = fs.readFileSync(path.resolve(__dirname, '../session.txt'), { encoding: 'utf-8' });

    var [cookie, userAgent] = session.split(':');

    jav.config(
        {
            headers: {
                'User-Agent': userAgent.trim(),
                'Cookie': cookie.trim()
            }
        }
    );

    return jav;
};
