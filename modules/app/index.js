var $ = require('jquery');

// 测试UIbase
var UIBase = require('ui/base/base');
console.log(UIBase);

// 测试Promise
var Promise = require('es6-promise').Promise;
console.log(Promise);

// 测试template
require('util/template/template');
var tpl = __inline('test.tmpl');
$('body').append(tpl({}));

// 测试 zepto
var zepto = require('zepto');
console.log(zepto);

// 测试 underscore
var _ = require('underscore');
console.log(_)
