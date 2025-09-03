import Time from "./Time.js";

export default class Datetime {

    static get() {

        const time = Time.get();
        const Y = time.getFullYear();
        const M = time.getMonth() + 1;
        const D = time.getDate();
        const h = time.getHours();
        const m = time.getMinutes();
        const s = time.getSeconds();

        return Y + '-' +
            (M < 10 ? '0' + M : M) + '-' +
            (D < 10 ? '0' + D : D) + ' ' +
            (h < 10 ? '0' + h : h) + ':' +
            (m < 10 ? '0' + m : m) + ':' +
            (s < 10 ? '0' + s : s);

    }

}
