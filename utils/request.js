
import url from 'url';
import HttpsProxyAgent from 'https-proxy-agent';
import _request from 'request-promise';

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
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
        },
        simple: false,
        agent,
    });
}

const instance = getInstance();

module.exports = instance;
