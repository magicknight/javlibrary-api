
import _debug from 'debug';
import cheerio from 'cheerio';
import scrape from 'scrape-it';
import { createRequest } from '../utils/request';

import { URL_VIDEOCOMMENTS } from '../utils/helper';

const debug = _debug(`dev:${__filename}`);
const error = _debug(`dev:${__filename}`);

/**
 {
    id: 'javliida3q',
    comments: [
        {
            location: '',
            nickname: '',
            date: '',
            desc: '',
        }
    ]
 }
 * */
module.exports = async(id) => {
    try {
        var request = createRequest();
        var response = await request.get(`${URL_VIDEOCOMMENTS}${id}`);
        var $ = cheerio.load(response, {
            decodeEntities: false,
        });
        var data = scrape.scrapeHTML($, {
            comments: {
                listItem: '#video_comments table[id]',
                data: {
                    location: {
                        selector: '.nickname img',
                        attr: 'src',
                        convert: x => {
                            let match = x.match(/(\w+).png/);

                            if (match) {
                                return match[1];
                            }
                        }
                    },
                    nickname: {
                        selector: '.userid a',
                        how: 'html',
                    },
                    date: {
                        selector: '.date',
                        how: 'html',
                    },
                    desc: {
                        selector: 'textarea',
                        how: 'html',
                    }
                },
            }
        });

        data.id = id;
        debug('%O', data);

        return data;
    } catch (ex) {
        error('%O', ex);
    }
};
