/**
 * @file inherits from ES6 class in ES5
 * @author yanhaijing
 */

export function inherits(childClass, superClass) {
    // need es5 环境
    childClass.prototype = Object.create(superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(childClass, superClass)
    } else {
        childClass.__proto__ = superClass;
    }
}
