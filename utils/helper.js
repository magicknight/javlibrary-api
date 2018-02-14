
import cheerio from 'cheerio';
import scrape from 'scrape-it';

const URL_BESTREVIEWS = '/tl_bestreviews.php';
const URL_MOSTFAVSTAR = '/star_mostfav.php';
const URL_NEWCOMMENTS = '/vl_update.php';
const URL_NEWRELEASES = '/vl_newrelease.php';
const URL_NEWENTRIES = '/vl_newentries.php';
const URL_MOSTWANTDE = '/vl_mostwanted.php';
const URL_BESTRATED = '/vl_bestrated.php';
const URL_FAVVIDEO = '/mv_wanted.php';
const URL_REMOVEFAVVIDEO = '/mv_wanted.php';
const URL_FAVSTAR = '/mv_favstars.php';
const URL_REMOVEFAVSTAR = '/mv_favstars.php';
const URL_VIDEODETAIL = '/?v=';
const URL_VIDEOCOMMENTS = '/videocomments.php?v=';
const URL_VIDEOREVIEWS = '/videoreviews.php?mode=2&v=';
const URL_LISTBYSTAR = '/vl_star.php?s=';
const URL_LISTBYDIRECTOR = '/vl_director.php?d=';
const URL_LISTBYTAG = '/vl_genre.php?g=';
const URL_LISTBYMAKER = '/vl_maker.php?m=';
const URL_LISTBYLABEL = '/vl_label.php?l=';

function getResourceID(regex, link) {
    var match = link.match(regex);

    if (match) {
        return match[1];
    }

    return link;
}

function getLink(string) {
    if (string
        && !string.startsWith('http')) {
        return `https://${string}`;
    }

    return string;
}

function getVideoID(link) {
    return getResourceID(/v=(jav[^&]+)/, link);
}

function getDirectorID(link) {
    return getResourceID(/d=([^&]+)/, link);
}

function getMakerID(link) {
    return getResourceID(/m=([^&]+)/, link);
}

function getLabelID(link) {
    return getResourceID(/l=([^&]+)/, link);
}

function getTagID(link) {
    return getResourceID(/g=([^&]+)/, link);
}

function getCastID(link) {
    return getResourceID(/s=([^&]+)/, link);
}

function getLargeImage(url) {
    var match = url.match(/(-\d+)\.jpg/i);

    if (match) {
        return url.replace(match[1], `jp${match[1]}`);
    }

    return url;
}

function exactly(name) {
    if (name) {
        name = name.replace(/^[\w]+-[\d]+\s+/, '');
    }

    return name;
}

function parseList(html, options) {
    var $ = cheerio.load(html, {
        decodeEntities: false,
    });
    var data = scrape.scrapeHTML($, {
        list: {
            listItem: '.video[id]',
            data: {
                id: {
                    attr: 'id',
                    convert: x => x.replace('vid_', ''),
                },
                no: {
                    selector: '.id',
                    how: 'html',
                },
                name: {
                    selector: '.title',
                    how: 'html',
                },
                cover: {
                    selector: 'img',
                    attr: 'src',
                    convert: x => {
                        return {
                            small: getLink(x.substring(2, x.length)),
                            large: getLink(x.substring(2, x.length).replace(/ps\./, 'pl.')),
                        };
                    }
                }
            },
        },
        next: {
            selector: '.page_selector .page.last',
            attr: 'href',
            convert: x => {
                var match = x.match(/page=(\d+)/);

                if (match) {
                    return {
                        ...options,
                        page: options.page + 1,
                    };
                }

                return false;
            }
        }
    });

    return data;
}

module.exports = {
    URL_BESTREVIEWS,
    URL_MOSTFAVSTAR,
    URL_NEWCOMMENTS,
    URL_NEWRELEASES,
    URL_NEWENTRIES,
    URL_MOSTWANTDE,
    URL_BESTRATED,
    URL_VIDEODETAIL,
    URL_FAVVIDEO,
    URL_REMOVEFAVVIDEO,
    URL_FAVSTAR,
    URL_REMOVEFAVSTAR,
    URL_VIDEOCOMMENTS,
    URL_VIDEOREVIEWS,
    URL_LISTBYSTAR,
    URL_LISTBYDIRECTOR,
    URL_LISTBYTAG,
    URL_LISTBYMAKER,
    URL_LISTBYLABEL,

    getVideoID,
    getLink,
    getDirectorID,
    getMakerID,
    getLabelID,
    getTagID,
    getCastID,
    getLargeImage,

    exactly,
    parseList,
};

