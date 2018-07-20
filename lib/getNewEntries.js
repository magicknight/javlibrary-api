
import _debug from 'debug';
import { createRequest } from '../utils/request';

import { URL_NEWENTRIES, parseList } from '../utils/helper';

const debug = _debug(`dev:${__filename}`);
const error = _debug(`dev:${__filename}`);

/**
 {
    list: [
        {
            id: 'javli4rvsy',
            no: 'ABP-670',
            name: '身動き出来ない美少女をひたすらイカせまくる拘束性交 004 園田みおん緊縛解禁。',
            cover: {
                small: 'http://pics.dmm.co.jp/mono/movie/adult/118abp670/118abp670ps.jpg',
                large: 'http://pics.dmm.co.jp/mono/movie/adult/118abp670/118abp670pl.jpg',
            }
        }
    ],

    next: {
        page: 2,
    }
 }
 * */

/**
 * Get the newest entries items
 *
 * @param {object} options The pagination info.
 * @param {number} options.page The page index.
 * @param {number} options.order 0 is order by DESC, 1 is order by ASC.
 * @returns {object|undefined} A object the if successful. If failure not returned.
 * */
module.exports = async({ order = 1, page = 1 } = {}) => {
    try {
        var request = createRequest();
        var response = await request.get(`${URL_NEWENTRIES}?page=${page}`);
        var data = parseList(response, {
            order, page
        });

        debug('%O', data);
        return data;
    } catch (ex) {
        error('%O', ex);
    }
};
