
import _debug from 'debug';
import cheerio from 'cheerio';
import scrape from 'scrape-it';
import request from './request';

import { URL_FAVVIDEO, URL_REMOVEFAVVIDEO, URL_FAVSTAR, URL_REMOVEFAVSTAR, getVideoID, getCastID } from './utils';

const debug = _debug(`dev:${__filename}`);
const error = _debug(`dev:${__filename}`);

/**
 [
     {
        id: 'javlipz62q',
        videoid: '23248034',
        name: 'MIDD-791 1日10回射精しても止まらないオーガズムSEX 大橋未久',
     }
 ]
 * */
async function getFavVideo(cookie) {
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

/**
 [
     {
        id: 'oy6a',
        castid: '3102001',
        name: '桜木凛',
     }
 ]
 * */
async function getFavStar(cookie) {
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
