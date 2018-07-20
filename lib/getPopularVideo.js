
import _debug from 'debug';
import { createRequest } from '../utils/request';

import { parseList } from '../utils/helper';

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
 }
 * */

/**
 * Get the most popular items
 *
 * @returns {object|undefined} A object the if successful. If failure not returned.
 * */
module.exports = async() => {
    try {
        var request = createRequest();
        var response = await request.get('/');
        var data = parseList(response);

        debug('%O', data);
        return data;
    } catch (ex) {
        error('%O', ex);
    }
};
