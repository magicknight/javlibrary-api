
import _debug from 'debug';
import cheerio from 'cheerio';
import scrape from 'scrape-it';
import { createRequest } from '../utils/request';

import { URL_VIDEOREVIEWS } from '../utils/helper';

const debug = _debug(`dev:${__filename}`);
const error = _debug(`dev:${__filename}`);

/**
 {
    id: 'javliida3q',
    comments: [
        {
            location: '',
            username: '',
            date: '',
            content: '',
        }
    ]
 }
 * */

/**
 * Get the reviews by item id
 *
 * @param {string} id - ID of the item
 * @returns {object|undefined} A object the if successful. If failure not returned.
 * */
const getVideoReviews = async(id) => {
    try {
        var request = createRequest();
        var response = await request.get(`${URL_VIDEOREVIEWS}${id}`);
        var $ = cheerio.load(response, {
            decodeEntities: false,
        });
        var data = scrape.scrapeHTML($, {
            reviews: {
                listItem: '#video_reviews table[id]',
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
                    username: {
                        selector: '.userid a',
                        how: 'html',
                    },
                    date: {
                        selector: '.date',
                        how: 'html',
                    },
                    content: {
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

module.exports = getVideoReviews;
