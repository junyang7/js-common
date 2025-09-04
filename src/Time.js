import UnixMilli from "./UnixMilli.js";

export default class Time {

    static humanByDatetime(datetime) {

        const now = UnixMilli.get();
        const old = UnixMilli.getByDatetime(datetime);

        const diff = now - old;
        if (diff < 0) {
            return datetime;
        }

        const sec = Math.floor(diff / 1000);
        const min = Math.floor(sec / 60);
        const hour = Math.floor(min / 60);
        const day = Math.floor(hour / 24);
        const week = Math.floor(day / 7);
        const month = Math.floor(day / 30);
        const year = Math.floor(day / 365);

        if (year >= 1) {
            return year + "年前";
        }

        if (month >= 1) {
            return month + "月前";
        }

        if (week >= 1) {
            return week + "周前";
        }

        if (day >= 1) {
            return day + "天前";
        }

        if (hour >= 1) {
            return hour + "小时前";
        }

        if (min >= 1) {
            return min + "分钟前";
        }

        return sec + "秒前";

    }

    static get() {

        return new Date();

    }

    static getByUnix(unix) {

        return new Date(unix * 1000);

    }

    static getByUnixMilli(unixMilli) {

        return new Date(unixMilli);

    }

    static getByUnixMicro(unixMicro) {

        return new Date(unixMicro / 1000);

    }

    static getByFormatAndString(f, s) {

        // 暂时限定这几种，后边用到了再加
        if (["Y-m-d", "Y-m-d H:i:s", "Y-m-d H:i:s.f", "Y/m/d",].includes(f)) {
            return new Date(s);
        }

        throw Error("不支持的格式");

    }

    static getByDate(date) {

        return new Date(date);

    }

    static getByDatetime(datetime) {

        return new Date(datetime);

    }

    static getByDatetimeMilli(datetimeMilli) {

        return new Date(datetimeMilli);

    }

    static parse(t) {

        return {
            Y: t.getFullYear(),
            m: String(t.getMonth() + 1).padStart(2, "0"),
            d: String(t.getDate()).padStart(2, "0"),
            H: String(t.getHours()).padStart(2, "0"),
            i: String(t.getMinutes()).padStart(2, "0"),
            s: String(t.getSeconds()).padStart(2, "0"),
            f: String(t.getMilliseconds()).padStart(3, "0"),
        };

    }

    static format(t, f) {

        if (["Y-m-d", "Y-m-d H:i:s", "Y-m-d H:i:s.f", "Y/m/d",].includes(f)) {
            const p = this.parse(t);
            return f.replace(/[YmdHisf]/g, match => p[match]);
        }
        throw Error("不支持的格式");

    }

}
