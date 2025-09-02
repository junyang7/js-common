import UnixMilli from "./UnixMilli.js";

export default class Unix {
    static get() {
        return Math.floor(UnixMilli.get() / 1000);
    }
}
