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

}
