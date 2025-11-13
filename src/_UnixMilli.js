export default class _UnixMilli {

    static get() {
        return Date.now();
    }

    static getByDatetime(datetime) {
        return new Date(datetime.replace(" ", "T")).getTime();
    }

}
