
import cheerio from 'cheerio';
import scrape from 'scrape-it';
import { Pool } from 'pg';

import request from './request';

const baseURL = 'http://warashi-asian-pornstars.fr';
const pool = new Pool({
    port: 5432,
    host: '...',
    user: '...',
    password: '...',
    database: '...',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

async function addStar(item) {
    try {
        var client = await pool.connect();

        var res = await client.query(
            `
            insert into
                stars(name, url, avatar, photos, alias, birthday, cup, height, weight)
                values($1, $2, $3, $4, $5, $6, $7, $8, $9)
            returning *
            `,
            [
                item.name,
                item.url,
                item.avatar,
                item.profile.photos,
                item.profile.alias,
                item.profile.birthday,
                item.profile.cpu,
                item.profile.height,
                item.profile.weight,
            ]
        );

        client.release();
        console.log('Insert \n%O', res.rows[0]);
    } catch(ex) {
        console.error(ex);
    }
}

async function parseStar(url) {
    try {
        var response = await request({ baseUrl: '', uri: url });
        var $ = cheerio.load(response, {
            decodeEntities: false,
        });
        var data = scrape.scrapeHTML($, {
            photos: {
                listItem: '#pornostar-profil-photos img',
                data: {
                    image: {
                        attr: 'src',
                        convert: x => `${baseURL}${x}`
                    }
                }
            },
            alias: {
                listItem: '#pornostar-profil-noms-alternatifs li',
                data: {
                    en: {
                        selector: 'span:first-child',
                        how: 'html',
                    },
                    jp: {
                        selector: 'span:last-child',
                        how: 'html',
                    },
                },
            },
            birthday: {
                selector: '#pornostar-profil-infos time',
                attr: 'content',
            },
            cup: {
                selector: '#pornostar-profil-infos p:nth-child(12)',
                how: 'html',
                convert: x => {
                    var match = (x || '').match(/^cup size: (\w)/);

                    if (match) {
                        return match[1];
                    }
                }
            },
            height: {
                selector: '#pornostar-profil-infos p[itemprop="height"] span',
                how: 'html',
            },
            weight: {
                selector: '#pornostar-profil-infos p[itemprop="weight"] span',
                how: 'html',
            },
        });

        return data;
    } catch (ex) {
        console.error(ex);
    }
}

module.exports = async function createDB(page = 1) {
    try {
        var response = await request({
            baseUrl: '',
            uri: `${baseURL}/en/s-2-2/female-pornstars/toutes/all/page/${page}`,
        });
        var $ = cheerio.load(response, {
            decodeEntities: false,
        });
        var data = scrape.scrapeHTML($, {
            list: {
                listItem: '.listing-pornostars figure',
                data: {
                    name: {
                        selector: 'img',
                        attr: 'alt',
                    },
                    url: {
                        selector: 'a',
                        attr: 'href',
                        convert: x => {
                            return `${baseURL}${x}`;
                        }
                    },
                    avatar: {
                        selector: 'img',
                        attr: 'src',
                        convert: x => {
                            return `${baseURL}${x}`;
                        }
                    },
                },
            },
            next: {
                selector: '.listing-navigation:first-child li:last-child a',
                how: 'html',
                convert: x => {
                    var max = +x;

                    if (page < max) {
                        return {
                            page: page + 1,
                        };
                    }

                    return false;
                }
            }
        });

        for (let item of data.list) {
            let profile = await parseStar(item.url);
            item.profile = profile;

            addStar(item);
        }

        if (data.next) {
            createDB(data.next.page);
        }
    } catch (ex) {
        console.error(ex);
    }
};
