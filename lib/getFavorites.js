
import _debug from 'debug';
import cheerio from 'cheerio';
import scrape from 'scrape-it';
import request from '../utils/request';

import { URL_FAVORITES, getVideoID } from '../utils/helper';

const debug = _debug(`dev:${__filename}`);
const error = _debug(`dev:${__filename}`);

/**
 [
     {
        id: 'javlipz62q',
        name: 'MIDD-791 1日10回射精しても止まらないオーガズムSEX 大橋未久',
     }
 ]
 * */
module.exports = async(cookie) => {
    try {
        var response = await request({
            uri: URL_FAVORITES,
            headers: {
                cookie,
            },
        });
        var $ = cheerio.load(response, {
            decodeEntities: false,
        });
        var data = scrape.scrapeHTML($, {
            list: {
                listItem: '.videotextlist tr a',
                data: {
                    id: {
                        attr: 'href',
                        convert: x => getVideoID(x)
                    },
                    name: {
                        attr: 'title',
                    },
                },
            }
        });

        data.size = data.list.length;
        debug('%O', data);
        return data;
    } catch (ex) {
        error('%O', ex);
    }
};
