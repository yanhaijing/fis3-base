/**
 * template 引擎
 * @author yanhaijing
 * @date 2015年8月1日
 */

import template from 'lib/template/template.js';

template.config({
    sTag: '<#',
    eTag: '#>'
});

// 暴漏到windows，供预编译使用
window.template = template;

export {template};
