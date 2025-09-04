import Time from "./Time.js";

export default class Date {

    static get() {
        return this.getByTime(Time.get())
    }

    static getByTime(t) {
        return Time.format(t, "Y-m-d")
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

    static getByDatetime(datetime) {
        return datetime.slice(0, 10);
    }

    static getByFormat(f) {
        if (["Y-m-d", "Ymd", "Y/m/d",].includes(f)) {
            const p = Time.parse(Time.get())
            return f.replace(/[YmdHisf]/g, match => p[match]);
        }
        throw Error("不支持的格式");
    }

    static getByTimeAndFormat(t, f) {
        if (["Y-m-d", "Ymd", "Y/m/d",].includes(f)) {
            const p = Time.parse(t)
            return f.replace(/[YmdHisf]/g, match => p[match]);
        }
        throw Error("不支持的格式");
    }

}
