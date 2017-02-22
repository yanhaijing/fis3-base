/**
 * @file ES5下继承ES6中的class，参考nodejs api
 * @author yanhaijing
 */

function inherits(Child, Parent) {
    // 需要es5环境
    Child.prototype = Object.create(Parent.prototype, {
        constructor: {
            value: Child,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    // 静态属性继承，兼容ie慎用
    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(Child, Parent);
    } else {
        Child.__proto__ = Parent;
    }
}

export {inherits};
