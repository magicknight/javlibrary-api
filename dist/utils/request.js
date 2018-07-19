'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _httpsProxyAgent = require('https-proxy-agent');

var _httpsProxyAgent2 = _interopRequireDefault(_httpsProxyAgent);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {};

function getInstance() {
    var lang = process.env.lang || 'en';
    var agent;

    if (['en', 'jp', 'tw', 'cn'].indexOf(lang) === -1) {
        lang = 'en';
    }

    if (process.env.http_proxy) {
        agent = new _httpsProxyAgent2.default(_url2.default.parse(process.env.http_proxy));
    }

    return _requestPromise2.default.defaults(_extends({
        baseUrl: 'http://www.javlibrary.com/' + lang + '/',
        simple: false,
        agent: agent
    }, defaultOptions));
}

module.exports = {
    config: function config(options) {
        return defaultOptions = options;
    },
    createRequest: getInstance
};