
import url from 'url';
import HttpsProxyAgent from 'https-proxy-agent';
import _request from 'request-promise';

let defaultOptions = {};

function getInstance() {
    var lang = process.env.lang || 'en';
    var agent;

    if (['en', 'jp', 'tw', 'cn'].indexOf(lang) === -1) {
        lang = 'en';
    }

    if (process.env.http_proxy) {
        agent = new HttpsProxyAgent(url.parse(process.env.http_proxy));
    }

    return _request.defaults({
        baseUrl: `http://www.javlibrary.com/${lang}/`,
        simple: false,
        agent,
        ...defaultOptions,
    });
}

module.exports = {
    config: options => (defaultOptions = options),
    createRequest: getInstance
};
