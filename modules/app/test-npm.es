// 测试template
var template = require('template_js');
console.log(template);

window.template = template;
var tpl = __inline('test.tmpl');
document.body.innerHTML = tpl({});

var EventEmitter = require('@jsmini/event').EventEmitter;
console.log(EventEmitter);
