export default class Base64Format {

    static encode(data) {
        return data.replace(/\+/g, "-").replace(/\//g, "_").replace(/(=*$)/g, "");
    }

    static decode(data) {
        return data.replace(/-/g, "+").replace(/_/g, "/") + ("=".repeat(3 - (3 + data.length) % 4));
    }

}
