import Time from "./Time.js";

export default class DatetimeMilli {

    static get() {
        return this.getByTime(Time.get())
    }

    static getByTime(t) {
        return Time.format(t, "Y-m-d H:i:s.f")
    }

    static getByUnix(unix) {
        return this.getByTime(Time.getByUnix(unix))
    }

    static getByUnixMilli(unixMilli) {
        return this.getByTime(Time.getByUnixMilli(unixMilli))
    }

    static getByUnixMicro(unixMicro) {
        return this.getByTime(Time.getByUnixMicro(unixMicro))
    }

    static getByFormat(f) {
        if (["Y-m-d H:i:s.f",].includes(f)) {
            const p = Time.parse(Time.get())
            return f.replace(/[YmdHisf]/g, match => p[match]);
        }
        throw Error("不支持的格式");
    }

    static getByTimeAndFormat(t, f) {
        if (["Y-m-d H:i:s.f",].includes(f)) {
            const p = Time.parse(t)
            return f.replace(/[YmdHisf]/g, match => p[match]);
        }
        throw Error("不支持的格式");
    }

}
