/**
 * @file url query 相关函数
 * @author yanhaijing.com
 * @date 2016年11月16日19:28:49
 */

import $ from 'jquery';
import {isString, isObject} from 'util/type';

// 将query转换为对象
function parse(queryString = '') {
    if (!isString(queryString)) {
        throw new TypeError('parse: first param must is string', 'querystring.es');
    }

    const decode = decodeURIComponent

    return queryString.split('&').reduce((search, kvStr) => {
        const [key, value] = kvStr.split('=')

        search[decode(key)] = decode(value)
        return search
    }, {})
}

// 序列化一个对象到query
function stringify(obj) {
    if (!isObject(obj)) {
        throw new TypeError('parse: first param must is object', 'querystring.es');
    }

    return $.param(obj);
}

export {parse, stringify};
