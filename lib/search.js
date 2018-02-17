
import _debug from 'debug';
import request from 'request';

import { URL_SEARCH } from '../utils/helper';

const error = _debug(`dev:${__filename}`);

/**
 {
    keywords: 'bbi142',
    jav: 'javlija45u',
 }
 * */
module.exports = async(keywords) => {
    keywords = keywords.split(' ').join('+');

    return new Promise(resolve => {
        try {
            var r = request.get(`${URL_SEARCH}${keywords}`, () => {
                var href = r.uri.href;
                var matched = href.match(/v=(jav\w+)$/);

                if (matched) {
                    resolve({
                        keywords,
                        jav: matched[1],
                    });
                } else {
                    resolve(false);
                }
            });
        } catch (ex) {
            error(ex);
            resolve(false);
        }
    });
};
