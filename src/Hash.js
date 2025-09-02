import CryptoJS from "crypto-js";

export default class Hash {

    static md5(data) {
        return CryptoJS.MD5(data).toString();
    }

    Sha1(data) {
        return CryptoJS.SHA1(data).toString();
    }

    Sha256(data) {
        return CryptoJS.SHA256(data).toString();
    }

    Sha512(data) {
        return CryptoJS.SHA512(data).toString();
    }

    HmacSha1(data, key) {
        return CryptoJS.HmacSHA1(data, key).toString();
    }

    HmacSha256(data, key) {
        return CryptoJS.HmacSHA256(data, key).toString();
    }

    HmacSha512(data, key) {
        return CryptoJS.HmacSHA512(data, key).toString();
    }

}
