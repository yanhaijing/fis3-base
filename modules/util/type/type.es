/**
 * 获取变量的类型
 * @author yanhaijing.com
 * @date 2015年1月1日
 */

let toString = ''.toString;

function type(x) {
    if(x === null){
        return 'null';
    }

    let t= typeof x;

    if(t !== 'object'){
        return t;
    }
    let c;
    try {
        c = toString.call(x).slice(8, -1).toLowerCase();
    } catch(exp) {
        return 'object';
    }
    if(c !== 'object'){
        return c;
    }

    if(x.constructor==Object){
        return c;
    }

    return 'unknow';
}

function isBoolean(x) {
    return type(x) === 'boolean';
}
function isString(x) {
    return type(x) === 'string';
}
function isObject(x) {
    return type(x) === 'object';
}

function isFunction(x) {
    return type(x) === 'function';
}

function isNull(x) {
    return type(x) === 'null';
}

function isUndef(x) {
    return type(x) === 'undefined';
}

function isNullOrUndef(x) {
    return isNull(x) || isUndef(x);
}

export {type, isBoolean, isString, isObject, isFunction, isNull, isUndef, isNullOrUndef};
