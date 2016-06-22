import {EventEmitter} from 'util/event/event';
import {guid} from 'util/guid/guid';

class UIBase extends EventEmitter{
    constructor() {
        super();
        this.guid = guid();
    }
}

export {UIBase};
