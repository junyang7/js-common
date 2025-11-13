import CryptoJS from "crypto-js";

export default class _Hash {

    static md5(data) {
        return CryptoJS.MD5(data).toString();
    }

    static sha1(data) {
        return CryptoJS.SHA1(data).toString();
    }

    static sha256(data) {
        return CryptoJS.SHA256(data).toString();
    }

    static sha512(data) {
        return CryptoJS.SHA512(data).toString();
    }

    static hmacSha1(data, key) {
        return CryptoJS.HmacSHA1(data, key).toString();
    }

    static hmacSha256(data, key) {
        return CryptoJS.HmacSHA256(data, key).toString();
    }

    static hmacSha512(data, key) {
        return CryptoJS.HmacSHA512(data, key).toString();
    }

}
