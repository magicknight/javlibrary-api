
import _debug from 'debug';
import cheerio from 'cheerio';
import scrape from 'scrape-it';
import request from './request';

const debug = _debug(`dev:${__filename}`);
const error = _debug(`dev:${__filename}`);

async function parse(uri) {
    try {
        var response = await request.get({
            baseUrl: '',
            uri,
        });
        var $ = cheerio.load(response, {
            decodeEntities: false,
        });
        var data = scrape.scrapeHTML($, {
            src: {
                selector: '#video-player source',
                attr: 'src',
            }
        });

        if (data.src) {
            debug('Find SRC:\n%O', data);

            let response = await request.get({
                baseUrl: '',
                url: data.src,
                simple: false,
                resolveWithFullResponse: true,
            });
            let res = {
                referer: response.request.headers.referer,
                href: response.request.href,
            };

            debug('%O', res);
        }

        return data.src;
    } catch (ex) {
        error('%O', ex);
    }
}

module.exports = async(no) => {
    try {
        var response = await request.get({
            baseUrl: '',
            uri: `https://api.avgle.com/v1/search/${no}/0`,
            json: true,
        });

        if (response.success
            && response.response
            && response.response.videos.length) {
            let video = response.response.videos[0];

            debug('Video:\n%O', video);
            return {
                preview: video['preview_video_url'],
                src: await parse(video['video_url'])
            };
        }
    } catch (ex) {
        error('%O', ex);
    }
};
