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
        const nowDate = new Date(now);
        const oldDate = new Date(old);
        const yearDiff = nowDate.getFullYear() - oldDate.getFullYear();
        const monthDiff = yearDiff * 12 + (nowDate.getMonth() - oldDate.getMonth());
        const weekDiff = Math.floor(day / 7);

        if (yearDiff >= 1) {
            return yearDiff + "年前";
        }

        if (monthDiff >= 1) {
            return monthDiff + "月前";
        }

        if (weekDiff >= 1) {
            return weekDiff + "周前";
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
