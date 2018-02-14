
import _debug from 'debug';
import cheerio from 'cheerio';
import scrape from 'scrape-it';
import request from '../utils/request';

import { URL_MOSTFAVSTAR, getLink } from '../utils/helper';

const debug = _debug(`dev:${__filename}`);
const error = _debug(`dev:${__filename}`);

/**
 {
    list: [
        {
            id: 'ayuf2',
            name: '園田みおん',
            avatar: 'i.imgur.com/UO4uBwj.jpg',
        },
        ...
    ],

    size: 20,
 }
 * */
module.exports = async() => {
    try {
        var response = await request.get(`${URL_MOSTFAVSTAR}`);
        var $ = cheerio.load(response, {
            decodeEntities: false,
        });
        var data = scrape.scrapeHTML($, {
            list: {
                listItem: '.searchitem[id]',
                data: {
                    id: {
                        attr: 'id',
                    },
                    name: {
                        selector: 'img',
                        attr: 'title',
                    },
                    avatar: {
                        selector: 'img',
                        attr: 'src',
                        convert: x => getLink(x.substring(2, x.length))
                    }
                }
            }
        });

        data.size = data.list.length;
        debug('%O', data);
        return data;
    } catch (ex) {
        error('%O', ex);
    }
};
