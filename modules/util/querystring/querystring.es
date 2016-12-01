/**
 * @file url query 相关函数
 * @author yanhaijing.com
 * @date 2016年11月16日19:28:49
 */

import $ from 'jquery';
import {isString, isObject} from 'util/type';

// 将query转换为对象
function parse(str = '') {
    if (!isString(str)) {
        throw new TypeError('parse: first param must is string', 'querystring.es');
    }

    let res = {};

    str.split('&').forEach(function (term) {
        let terms = term.split['='];
        res[terms[0]] = terms[1];
    });

    return res;
}

// 序列化一个对象到query
function stringify(obj) {
    if (!isObject(obj)) {
        throw new TypeError('parse: first param must is object', 'querystring.es');
    }

    return $.param(obj);
}

export {parse, stringify};
