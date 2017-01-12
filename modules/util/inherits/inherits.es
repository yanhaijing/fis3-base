/**
 * @file inherits from ES6 class in ES5 environment
 * @author CeHOU
 */

export function inherits(childClass, superClass) {
    childClass.prototype = Object.create(superClass.prototype);
    // 这里注意兼容性，IE11以上才完全支持
    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(childClass, superClass)
    }
    else {
        childClass.__proto__ = superClass;
    }
}
