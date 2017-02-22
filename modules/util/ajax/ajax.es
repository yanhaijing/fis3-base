/**
 * 通过ajax操作，返回promise实例，参考fetch
 * @author yanhaijing.com
 * @date 2016年1月2日
 */

import $ from 'jquery';
import {Promise} from 'es6-promise';

let jqAjax = $.ajax;
 
$.ajax = function (...rest) {
    console && console.warn && console.warn('please use ajax in ajax.es');
    jqAjax(...rest);
};

function ajax(opt) {
    // 智能猜测 dataType
    // 支持 xml html script json jsonp text
    return Promise.resolve(jqAjax(opt));
}

export {ajax};
