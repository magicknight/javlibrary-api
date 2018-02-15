
import _debug from 'debug';
import cheerio from 'cheerio';
import scrape from 'scrape-it';
import request from '../utils/request';
import helper from '../utils/helper';

import { URL_VIDEODETAIL, getDirectorID, getMakerID, getLabelID, getTagID, getCastID, getLargeImage, getLink } from '../utils/helper';

const debug = _debug(`dev:${__filename}`);
const error = _debug(`dev:${__filename}`);

/**
 {
    id: 'javliida3q',
    no: 'IPZ-462'
    name: 'IPZ-462 Wエロ痴女ナース 過激で刺激的 凄絶な240分',
    date: '2014-10-01',
    length: 240,
    director: 'キョウセイ',
    directorID: 'a4lq',
    maker: 'IDEA POCKET',
    makerID: 'aq4q',
    label: 'ティッシュ',
    labelID: 'buwq',
    rate: 9.1,
    cover: {
        small: 'pics.dmm.co.jp/mono/movie/adult/bda045/bda045ps.jpg',
        large: 'pics.dmm.co.jp/mono/movie/adult/bda045/bda045pl.jpg',
    },
    tags: [
        {
            name: '',
            id: '',
        },
    ],
    cast: [
        {
            name: '',
            id: '',
        }
    ],
    previews: [
        '', '', '',
    ],
 }
 * */
module.exports = async(id) => {
    debug(id);

    try {
        var response = await request.get(`${URL_VIDEODETAIL}${id}`);
        var $ = cheerio.load(response, {
            decodeEntities: false,
        });
        var data = scrape.scrapeHTML($, {
            no: {
                selector: '#video_id .text',
                how: 'html',
            },
            name: {
                selector: '#video_title a',
                how: 'html',
                convert: x => helper.exactly(x),
            },
            date: {
                selector: '#video_date td.text',
                how: 'html',
            },
            length: {
                selector: '#video_length span.text',
                how: 'html',
                convert: x => parseInt(x)
            },
            director: {
                selector: '#video_director a',
                how: 'html',
            },
            directorID: {
                selector: '#video_director a',
                attr: 'href',
                convert: x => getDirectorID(x)
            },
            maker: {
                selector: '#video_maker a',
                how: 'html',
            },
            makerID: {
                selector: '#video_maker a',
                attr: 'href',
                convert: x => getMakerID(x)
            },
            label: {
                selector: '#video_label a',
                how: 'html',
            },
            labelID: {
                selector: '#video_label a',
                attr: 'href',
                convert: x => getLabelID(x)
            },
            rate: {
                selector: '#video_review .score',
                how: 'html',
                convert: x => {
                    return x ? +x.substring(1, x.length - 1) : 0;
                }
            },
            tags: {
                listItem: '#video_genres a',
                data: {
                    name: {
                        how: 'html',
                    },
                    id: {
                        attr: 'href',
                        convert: x => getTagID(x),
                    }
                },
            },
            stars: {
                listItem: '#video_cast .star a',
                data: {
                    name: {
                        how: 'html',
                    },
                    id: {
                        attr: 'href',
                        convert: x => getCastID(x),
                    }
                },
            },
            cover: {
                selector: '#video_jacket_img',
                attr: 'src',
                convert: x => {
                    return {
                        small: getLink(x.substring(2, x.length).replace(/pl\./, 'ps.')),
                        large: getLink(x.substring(2, x.length)),
                    };
                },
            },
            previews: {
                listItem: '.previewthumbs img',
                data: {
                    img: {
                        attr: 'src',
                        convert: x => {
                            return {
                                small: getLink(x),
                                large: getLink(getLargeImage(x)),
                            };
                        },
                    }
                }
            }
        });

        if (data.previews) {
            data.previews = data.previews.map(e => e.img);
        }

        if (data.previews.length === 0
            && data.cover.small.indexOf('pics.dmm.co.jp') !== -1) {
            let parts = data.cover.small.split('/');
            let id = parts[parts.length - 2].replace(/(\d{3})$/,  '00$1');
            let previews = [];

            for (let length = 10; length > 0;) {
                let image = `pics.dmm.co.jp/digital/video/${id}/${id}-${length--}.jpg`;

                previews.push({
                    small: getLink(image),
                    large: getLink(getLargeImage(image)),
                });
            }

            data.previews = previews.reverse();
            debug('Get Previews:\n%O', previews);
        }

        data.id = id;
        debug('%O', data);

        return data;
    } catch (ex) {
        error('%O', ex);
    }
};
