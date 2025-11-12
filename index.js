import Aes from "./src/Aes.js";
import Axios from "./src/Axios.js";
import Base64Format from "./src/Base64Format.js";
import Date from "./src/Date.js";
import Datetime from "./src/Datetime.js";
import DatetimeMilli from "./src/DatetimeMilli.js";
import Debug from "./src/Debug.js";
import Duration from "./src/Duration.js";
import Hash from "./src/Hash.js";
import Helper from "./src/Helper.js";
import IndexedDB from "./src/IndexedDB.js";
import Rsa from "./src/Rsa.js";
import Sql from "./src/Sql.js";
import Time from "./src/Time.js";
import Unix from "./src/Unix.js";
import UnixMilli from "./src/UnixMilli.js";
import Uuid from "./src/Uuid.js";
import _Coordinate from "./src/_Coordinate.js";
import _Object from "./src/_Object.js";

const jc = {
    Aes,
    Axios,
    Base64Format,
    Date,
    Datetime,
    DatetimeMilli,
    Debug,
    Duration,
    Hash,
    Helper,
    IndexedDB,
    Rsa,
    Sql,
    Time,
    Unix,
    UnixMilli,
    Uuid,
    _Coordinate,
    _Object,
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
