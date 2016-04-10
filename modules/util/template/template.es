/**
 * @file template 引擎
 * @author yanhaijing
 * @date 2015年8月12日 11:27:55
 */

import template from 'lib/template/template.js';

template.config({
    sTag: '<#',
    eTag: '#>'
});

window.template = template; // 暴漏到windows，供预编译使用

export {template};
