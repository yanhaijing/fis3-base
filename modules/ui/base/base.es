import {EventEmitter} from 'util/event/event';
import {guid} from 'util/guid/guid';

var guid = 1;

class UIBase extends EventEmitter{
    constructor() {
        super();
        this.guid = guid();
    }
}

export {UIBase};
