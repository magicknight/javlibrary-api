'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _scrapeIt = require('scrape-it');

var _scrapeIt2 = _interopRequireDefault(_scrapeIt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL_BESTREVIEWS = '/tl_bestreviews.php';
var URL_MOSTFAVSTAR = '/star_mostfav.php';
var URL_NEWCOMMENTS = '/vl_update.php';
var URL_NEWRELEASES = '/vl_newrelease.php';
var URL_NEWENTRIES = '/vl_newentries.php';
var URL_MOSTWANTDE = '/vl_mostwanted.php';
var URL_BESTRATED = '/vl_bestrated.php';
var URL_FAVVIDEO = '/mv_wanted.php';
var URL_REMOVEFAVVIDEO = '/mv_wanted.php';
var URL_FAVSTAR = '/mv_favstars.php';
var URL_REMOVEFAVSTAR = '/mv_favstars.php';
var URL_VIDEODETAIL = '/?v=';
var URL_VIDEOCOMMENTS = '/videocomments.php?v=';
var URL_VIDEOREVIEWS = '/videoreviews.php?mode=2&v=';
var URL_LISTBYSTAR = '/vl_star.php?s=';
var URL_LISTBYDIRECTOR = '/vl_director.php?d=';
var URL_LISTBYTAG = '/vl_genre.php?g=';
var URL_LISTBYMAKER = '/vl_maker.php?m=';
var URL_LISTBYLABEL = '/vl_label.php?l=';

function getResourceID(regex, link) {
    var match = link.match(regex);

    if (match) {
        return match[1];
    }

    return link;
}

function getLink(string) {
    if (string && !string.startsWith('http')) {
        return 'https://' + string;
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
        return url.replace(match[1], 'jp' + match[1]);
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
    var $ = _cheerio2.default.load(html, {
        decodeEntities: false
    });
    var data = _scrapeIt2.default.scrapeHTML($, {
        list: {
            listItem: '.video[id]',
            data: {
                id: {
                    attr: 'id',
                    convert: function convert(x) {
                        return x.replace('vid_', '');
                    }
                },
                no: {
                    selector: '.id',
                    how: 'html'
                },
                name: {
                    selector: '.title',
                    how: 'html'
                },
                cover: {
                    selector: 'img',
                    attr: 'src',
                    convert: function convert(x) {
                        return {
                            small: getLink(x.substring(2, x.length)),
                            large: getLink(x.substring(2, x.length).replace(/ps\./, 'pl.'))
                        };
                    }
                }
            }
        },
        next: {
            selector: '.page_selector .page.last',
            attr: 'href',
            convert: function convert(x) {
                var match = x.match(/page=(\d+)/);

                if (match) {
                    return _extends({}, options, {
                        page: options.page + 1
                    });
                }

                return false;
            }
        }
    });

    return data;
}

module.exports = {
    URL_BESTREVIEWS: URL_BESTREVIEWS,
    URL_MOSTFAVSTAR: URL_MOSTFAVSTAR,
    URL_NEWCOMMENTS: URL_NEWCOMMENTS,
    URL_NEWRELEASES: URL_NEWRELEASES,
    URL_NEWENTRIES: URL_NEWENTRIES,
    URL_MOSTWANTDE: URL_MOSTWANTDE,
    URL_BESTRATED: URL_BESTRATED,
    URL_VIDEODETAIL: URL_VIDEODETAIL,
    URL_FAVVIDEO: URL_FAVVIDEO,
    URL_REMOVEFAVVIDEO: URL_REMOVEFAVVIDEO,
    URL_FAVSTAR: URL_FAVSTAR,
    URL_REMOVEFAVSTAR: URL_REMOVEFAVSTAR,
    URL_VIDEOCOMMENTS: URL_VIDEOCOMMENTS,
    URL_VIDEOREVIEWS: URL_VIDEOREVIEWS,
    URL_LISTBYSTAR: URL_LISTBYSTAR,
    URL_LISTBYDIRECTOR: URL_LISTBYDIRECTOR,
    URL_LISTBYTAG: URL_LISTBYTAG,
    URL_LISTBYMAKER: URL_LISTBYMAKER,
    URL_LISTBYLABEL: URL_LISTBYLABEL,

    getVideoID: getVideoID,
    getLink: getLink,
    getDirectorID: getDirectorID,
    getMakerID: getMakerID,
    getLabelID: getLabelID,
    getTagID: getTagID,
    getCastID: getCastID,
    getLargeImage: getLargeImage,

    exactly: exactly,
    parseList: parseList
};