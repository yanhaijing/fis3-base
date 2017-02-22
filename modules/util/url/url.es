/**
 * @file url 相关参数，借鉴nodejs api
 * @author yanhaijing.com
 * @date 2016年11月16日19:28:49
 */

import {isString, isBoolean, isObject} from 'util/type';

import {parse as parseQs} from 'util/querystring';

// 解析url到url对象，必须为绝对url
function parse(url = '/', parseQueryString = false) {
    if (!isString(url)) {
        throw new TypeError('parse: first param must is string', 'url.es');
    }
    if (!isBoolean(parseQueryString)) {
        throw new TypeError('parse: second param must is boolean', 'url.es');
    }

    // http://user:pass@host.com:8080/p/a/t/h?query=string#hash
    let temp = url
        .match(/^([^:\/?#]+:)?\/\/(?:([^:@]*:[^:@]*)@)?([^:\/?#]+)(?:\:(\d*))?([^?#]*)(?:\?([^#]*))?(#(?:.*))?$/);

    // 匹配失败
    // 1: javascript: void 2: # 3: '' 4: 相对url
    if (!temp) {
        return {
            href: url
        }
    }

    let res = {
        href: url,
        protocol: temp[1] || '',
        auth: temp[2] || '',
        hostname: temp[3] || '',
        port: temp[4] || '',
        pathname: temp[5] || '',
        query: temp[6] || '',
        hash: temp[7] || ''
    };

    res.host = res.hostname + (res.port ? ':' : '') + res.port;

    res.search = (res.query ? '?' : '') + res.query;

    res.path = res.pathname + res.search;

    res.origin = res.protocol + '//' + res.auth + (res.auth ? '@' : '') + res.host;

    res.query = parseQueryString ? parseQs(res.query) : res.query;

    return res;
}

// url对象拼接成url
function format(urlObj) {
    if (!isObject(urlObj)) {
        throw new TypeError('format: first param must is object', 'url.es');
    }

    let protocol = urlObj.protocol || '';
    let auth = urlObj.auth || '';
    let hostname = urlObj.hostname || '';
    let port = urlObj.port || '';
    let pathname = urlObj.pathname || '';
    let query = urlObj.query || '';
    let hash = urlObj.hash || '';

    let res = protocol + '//' + auth + (auth ? '@' : '')
        + hostname + (port ? ':' : '') + port
        + pathname + (query ? '?' : '') + query + hash;

    return res === '//' ? urlObj.href : res; // backup 全部为空的bug
}

// 找到相对路径的full路径
function resolve(from, to) {
    if (!isString(from)) {
        throw new TypeError('resolve: first param must is string', 'url.es');
    }
    if (!isString(to)) {
        throw new TypeError('resolve: second param must is string', 'url.es');
    }

    
}

// 格式化url
function normalize(url) {
    if (!isString(url)) {
        throw new TypeError('normalize: first param must is string', 'url.es');
    }
}

export {parse, format, resolve, normalize};
