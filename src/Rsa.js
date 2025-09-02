import {JSEncrypt} from "jsencrypt";

export default class Rsa {

    static encode(data, pub) {
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(pub);
        return encrypt.encrypt(data);
    }

    static decode(data, pri) {
        let decrypt = new JSEncrypt();
        decrypt.setPrivateKey(pri);
        return decrypt.decrypt(data);
    }

}
