
import _debug from 'debug';
import { createRequest } from '../utils/request';
import { URL_SEARCH, parseList } from '../utils/helper';

const error = _debug(`dev:${__filename}`);

/**
 {
    keywords: 'bbi142',
    jav: 'javlija45u',
 }
 * */

/**
 * Get the detail by item id
 *
 * @param {string} keywords - Number plate.
 * @returns {object|undefined} A object the if successful. If failure not returned.
 * */
const search = async(keywords) => {
    keywords = keywords.split(' ').join('+');

    return new Promise(resolve => {
        var request = createRequest();
        try {
            var r = request.get(`${URL_SEARCH}${keywords}`, () => {
                var href = r.uri.href;
                var matched = href.match(/v=(jav\w+)$/);

                if (!r.getHeader('referer')) {
                    // Handle multiple search results
                    var data = parseList(r.response.body);
                    resolve({
                        keywords,
                        jav: data.list.map(e => e.id).join()
                    });
                    return;
                }

                if (matched) {
                    resolve({
                        keywords,
                        jav: matched[1],
                    });
                } else {
                    resolve();
                }
            });
        } catch (ex) {
            error(ex);
            resolve();
        }
    });
};

module.exports = search;
