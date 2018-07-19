
import _debug from 'debug';
import { createRequest } from '../utils/request';
import { URL_BESTRATED, parseList } from '../utils/helper';

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
        order: 1,
        page: 2,
    }
 }
 * */
module.exports = async({ order = 1, page = 1 } = {}) => {
    try {
        var request = createRequest();
        var response = await request.get(`${URL_BESTRATED}?page=${page}&mode=${order}`);
        var data = parseList(response, {
            order, page
        });

        debug('%O', data);
        return data;
    } catch (ex) {
        error('%O', ex);
    }
};
