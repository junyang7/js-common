import _Time from "./_Time.js";

export default class _DatetimeMilli {

    static get() {
        return this.getByTime(_Time.get())
    }

    static getByTime(t) {
        return _Time.format(t, "Y-m-d H:i:s.f")
    }

    static getByUnix(unix) {
        return this.getByTime(_Time.getByUnix(unix))
    }

    static getByUnixMilli(unixMilli) {
        return this.getByTime(_Time.getByUnixMilli(unixMilli))
    }

    static getByUnixMicro(unixMicro) {
        return this.getByTime(_Time.getByUnixMicro(unixMicro))
    }

    static getByFormat(f) {
        if (["Y-m-d H:i:s.f",].includes(f)) {
            const p = _Time.parse(_Time.get())
            return f.replace(/[YmdHisf]/g, match => p[match]);
        }
        throw Error("不支持的格式");
    }

    static getByTimeAndFormat(t, f) {
        if (["Y-m-d H:i:s.f",].includes(f)) {
            const p = _Time.parse(t)
            return f.replace(/[YmdHisf]/g, match => p[match]);
        }
        throw Error("不支持的格式");
    }

}
