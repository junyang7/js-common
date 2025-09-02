import {v4} from 'uuid';

export default class Uuid {
    static get() {
        return v4();
    }
}
