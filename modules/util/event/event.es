/**
 * @file 事件发射器类
 * @author yanhaijing.com
 * @date 2015年12月16日 20:17:32
 */
import $ from 'jquery';

class EventEmitter {
    constructor() {
        this.eventMonitor = $({});
    }
    addListener(event, listener) {
        this.eventMonitor.on(event, listener);
        return this;
    }
    removeListener(event) {
        this.eventMonitor.off(event);
        return this;
    }
    emit(event, ...args) {
        this.eventMonitor.trigger(event, ...args);
        return this;
    }
    on(...args) {
        return this.addListener(...args);
    }
    off(...args) {
        return this.removeListener(...args);
    }
    once(event, listener) {
        this.eventMonitor.once(event, listener);
        return this;
    }
}

var event = new EventEmitter();

export {EventEmitter, event};
