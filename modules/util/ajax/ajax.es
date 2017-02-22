/**
 * @file 通过ajax操作，返回promise实例，参考fetch
 * @author yanhaijing.com
 * @date 2016年1月25日 16:16:28
 */

import $ from 'jquery';
import {Promise} from 'es6-promise';

var jqAjax = $.ajax;

function ajax(opt) {
    // 智能猜测 dataType xml html script json jsonp text
    return Promise.resolve($.ajax(opt));
}

export {ajax};
