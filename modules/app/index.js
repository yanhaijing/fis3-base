var $ = require('jquery');
var UIBase = require('ui/base/base');
require('util/template/template');
var tpl = __inline('test.tmpl');

$('body').append(tpl({}));
console.log(UIBase);
