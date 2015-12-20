import {EventEmitter} from 'util/event/event';

var guid = 1;

class UIBase extends EventEmitter{
    constructor() {
        super();
        this.guid = guid++;
    }
}

export {UIBase};
