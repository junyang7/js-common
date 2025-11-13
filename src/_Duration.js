export default class _Duration {

    static format(second) {
        let o = {
            d: 0,
            h: 0,
            m: 0,
        }

        // < 1 分钟
        if (second < 60) {
            o.m = 1;
            return o;
        }

        // < 1 小时
        if (second < 3600) {
            o.m = Math.ceil(second / 60);
            return o;
        }

        // < 1 天
        if (second < 3600) {
            o.h = Math.floor(second / 3600);
            o.m = Math.ceil((second % 3600) / 60);
            return o;
        }

        // > 1 天
        o.d = Math.floor(second / 86400);
        o.h = Math.floor((second % 86400) / 3600);
        o.m = Math.ceil(((second % 86400) % 3600) / 60);
        return o;

    }

}
