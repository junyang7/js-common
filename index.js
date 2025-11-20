import _Aes from "./src/_Aes.js";
import _Array from "./src/_Array.js";
import _Avoid from "./src/_Avoid.js";
import _Axios from "./src/_Axios.js";
import _Base64Format from "./src/_Base64Format.js";
import _Coordinate from "./src/_Coordinate.js";
import _Date from "./src/_Date.js";
import _Datetime from "./src/_Datetime.js";
import _DatetimeMilli from "./src/_DatetimeMilli.js";
import _Debug from "./src/_Debug.js";
import _Distance from "./src/_Distance.js";
import _Duration from "./src/_Duration.js";
import _Hash from "./src/_Hash.js";
import _Helper from "./src/_Helper.js";
import _IndexedDB from "./src/_IndexedDB.js";
import _Object from "./src/_Object.js";
import _Rsa from "./src/_Rsa.js";
import _Sql from "./src/_Sql.js";
import _Time from "./src/_Time.js";
import _Unix from "./src/_Unix.js";
import _UnixMilli from "./src/_UnixMilli.js";
import _Uuid from "./src/_Uuid.js";
import _VueEvent from "./src/_VueEvent.js";
import _VueXStore from "./src/_VueXStore.js";
import _Zone from "./src/_Zone.js";

const jc = {
    _Aes,
    _Array,
    _Avoid,
    _Axios,
    _Base64Format,
    _Coordinate,
    _Date,
    _Datetime,
    _DatetimeMilli,
    _Debug,
    _Distance,
    _Duration,
    _Hash,
    _Helper,
    _IndexedDB,
    _Object,
    _Rsa,
    _Sql,
    _Time,
    _Unix,
    _UnixMilli,
    _Uuid,
    _VueEvent,
    _VueXStore,
    _Zone,
};

if (typeof window !== "undefined") {
    window.jc = jc;
}
if (typeof window === "undefined" && typeof global !== "undefined") {
    global.jc = jc;
}
jc.install = function (Vue) {
    if (!Vue.prototype.$jc) {
        Vue.prototype.$jc = jc;
    }
};

export default jc;
export {jc};
