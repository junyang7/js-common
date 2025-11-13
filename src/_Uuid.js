import {v4} from 'uuid';

export default class _Uuid {
    static get() {
        return v4();
    }
}
