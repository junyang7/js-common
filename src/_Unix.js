import _UnixMilli from "./_UnixMilli.js";

export default class _Unix {
    static get() {
        return Math.floor(_UnixMilli.get() / 1000);
    }
}
