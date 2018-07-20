
import _debug from 'debug';
import cheerio from 'cheerio';
import scrape from 'scrape-it';
import { createRequest } from '../utils/request';
import helper from '../utils/helper';

import { URL_BESTREVIEWS, getVideoID, getDirectorID, getMakerID, getLabelID } from '../utils/helper';

const debug = _debug(`dev:${__filename}`);
const error = _debug(`dev:${__filename}`);

/**
 {
    id: 'javli4qtzi',
    name: 'BDA-045 バミューダ5周年記念特別企画 坊主頭の女 波多野結衣',
    date: '2017-10-19',
    length: 137,
    director: 'あばしり一家',
    directorID: 'p4',
    maker: 'バミューダ/妄想族',
    makerID: 'm46a',
    label: 'バミューダ/妄想族',
    labelID: 'arace',
    rate: 7.1,
    cover: {
        small: 'pics.dmm.co.jp/mono/movie/adult/bda045/bda045ps.jpg',
        large: 'pics.dmm.co.jp/mono/movie/adult/bda045/bda045pl.jpg',
    },
 }
 * */

/**
 * Get the best review items
 *
 * @param {object} options The pagination info.
 * @param {number} options.order 0 is order by DESC, 1 is order by ASC.
 * @returns {object|undefined} A object the if successful. If failure not returned.
 * */
module.exports = async({ order = 1 } = {}) => {
    try {
        var request = createRequest();
        var response = await request.get(`${URL_BESTREVIEWS}?mode=${order}`);
        var $ = cheerio.load(response, {
            decodeEntities: false,
        });
        var data = scrape.scrapeHTML($, {
            list: {
                listItem: '#video_comments table[id]',
                data: {
                    id: {
                        selector: 'strong a',
                        attr: 'href',
                        convert: x => getVideoID(x)
                    },
                    name: {
                        selector: 'strong a',
                        how: 'html',
                        convert: x => helper.exactly(x),
                    },
                    date: {
                        selector: '.videoinfo tr:nth-child(1) td:last-child',
                        how: 'html',
                    },
                    length: {
                        selector: '.videoinfo tr:nth-child(2) td:last-child',
                        how: 'html',
                        convert: x => parseInt(x)
                    },
                    director: {
                        selector: '.videoinfo tr:nth-child(3) td:last-child a',
                        how: 'html',
                    },
                    directorID: {
                        selector: '.videoinfo tr:nth-child(3) td:last-child a',
                        attr: 'href',
                        convert: x => getDirectorID(x)
                    },
                    maker: {
                        selector: '.videoinfo tr:nth-child(4) td:last-child a',
                        how: 'html',
                    },
                    makerID: {
                        selector: '.videoinfo tr:nth-child(4) td:last-child a',
                        attr: 'href',
                        convert: x => getMakerID(x)
                    },
                    label: {
                        selector: '.videoinfo tr:nth-child(5) td:last-child a',
                        how: 'html',
                    },
                    labelID: {
                        selector: '.videoinfo tr:nth-child(5) td:last-child a',
                        attr: 'href',
                        convert: x => getLabelID(x)
                    },
                    rate: {
                        selector: '.videoinfo tr:nth-child(6) td:last-child span',
                        how: 'html',
                        convert: x => {
                            return +x.substring(1, x.length - 1);
                        }
                    },
                    text: {
                        selector: '.hidden',
                        how: 'html',
                    },
                    cover: {
                        selector: '.info + td img',
                        attr: 'src',
                        convert: x => {
                            return {
                                small: helper.getLink(x.substring(2, x.length)),
                                large: helper.getLink(x.substring(2, x.length).replace(/ps\./, 'pl.')),
                            };
                        },
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
