
import _debug from 'debug';
import cheerio from 'cheerio';
import scrape from 'scrape-it';
import { createRequest } from '../utils/request';

import { URL_FAVVIDEO, URL_REMOVEFAVVIDEO, URL_FAVSTAR, URL_REMOVEFAVSTAR, getVideoID, getCastID } from '../utils/helper';

const debug = _debug(`dev:${__filename}`);
const error = _debug(`dev:${__filename}`);

async function getFavVideo(cookie) {
    var request = createRequest();

    try {
        var response = await request({
            uri: URL_FAVVIDEO,
            headers: {
                cookie,
            },
        });
        var $ = cheerio.load(response, {
            decodeEntities: false,
        });
        var data = scrape.scrapeHTML($, {
            list: {
                listItem: '#rightcolumn .videotextlist tr:not(.header)',
                data: {
                    id: {
                        selector: 'a',
                        attr: 'href',
                        convert: x => getVideoID(x)
                    },
                    videoid: {
                        selector: 'input',
                        attr: 'value',
                    },
                    name: {
                        selector: 'a',
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
}

async function addFavVideo(id, cookie) {
    var request = createRequest();

    try {
        var response = await request({
            method: 'POST',
            baseUrl: '',
            uri: 'http://www.javlibrary.com/ajax/ajax_vl_favoriteadd.php',
            headers: {
                cookie,
            },
            form: {
                id,
                type: 3,
            },
            json: true,
        });

        debug('%O', response);
        return response;
    } catch (ex) {
        error('%O', ex);
    }
}

async function removeFavVideo(videoid, cookie) {
    var request = createRequest();

    try {
        await request({
            method: 'POST',
            uri: URL_REMOVEFAVVIDEO,
            headers: {
                cookie,
            },
            form: {
                'edittype': 1,
                'selectedVideos[]': videoid,
            },
        });

        return true;
    } catch (ex) {
        error('%O', ex);
    }
}

async function getFavStar(cookie) {
    var request = createRequest();

    try {
        var response = await request({
            uri: URL_FAVSTAR,
            headers: {
                cookie,
            },
        });
        var $ = cheerio.load(response, {
            decodeEntities: false,
        });
        var data = scrape.scrapeHTML($, {
            list: {
                listItem: '#rightcolumn .videotextlist tr:not(.header)',
                data: {
                    id: {
                        selector: 'a',
                        attr: 'href',
                        convert: x => getCastID(x)
                    },
                    castid: {
                        selector: 'input',
                        attr: 'value',
                    },
                    name: {
                        selector: 'a',
                        how: 'html',
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
}

async function addFavStar(id, cookie) {
    var request = createRequest();

    try {
        var response = await request({
            method: 'POST',
            baseUrl: '',
            uri: 'http://www.javlibrary.com/ajax/ajax_favoriteadd_star.php',
            headers: {
                cookie,
            },
            form: {
                id,
                type: 4,
            },
            json: true,
        });

        debug('%O', response);
        return response;
    } catch (ex) {
        error('%O', ex);
    }
}

async function removeFavStar(castid, cookie) {
    var request = createRequest();

    try {
        await request({
            method: 'POST',
            uri: URL_REMOVEFAVSTAR,
            headers: {
                cookie,
            },
            form: {
                'edittype': 1,
                'selectedVideos[]': castid,
            },
        });

        return true;
    } catch (ex) {
        error('%O', ex);
    }
}

module.exports = {
    getFavVideo,
    addFavVideo,
    removeFavVideo,
    getFavStar,
    addFavStar,
    removeFavStar,
};
