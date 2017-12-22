
import _debug from 'debug';
import request from './request';

import { URL_LISTBYSTAR, parseList } from './utils';

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
        id: 'ayuf2',
        page: 2,
    }
 }
 * */
module.exports = async({ id, page = 1 } = {}) => {
    try {
        var response = await request.get(`${URL_LISTBYSTAR}${id}&page=${page}`);
        var data = parseList(response, {
            id, page
        });

        debug('%O', data);
        return data;
    } catch (ex) {
        error('%O', ex);
    }
};
