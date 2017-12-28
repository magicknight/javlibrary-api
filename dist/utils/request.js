'use strict';

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _httpsProxyAgent = require('https-proxy-agent');

var _httpsProxyAgent2 = _interopRequireDefault(_httpsProxyAgent);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getInstance() {
    var agent;

    if (process.env.http_proxy) {
        agent = new _httpsProxyAgent2.default(_url2.default.parse(process.env.http_proxy));
    }

    return _requestPromise2.default.defaults({
        baseUrl: 'http://www.javlibrary.com/cn/',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
        },
        agent: agent
    });
}

var instance = getInstance();

module.exports = instance;