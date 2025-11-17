import axios from "axios";
import qs from "qs";
import _IndexedDB from "./_IndexedDB.js";

axios.defaults.withCredentials = true;

export default class _Axios {

    static METHOD = {GET: "GET", POST: "POST",}
    static CONTENT_TYPE = {
        X_WWW_FORM_URLENCODED: "application/x-www-form-urlencoded",
        FORM_DATA: "multipart/form-data",
        JSON: "application/json",
    }

    static async request(request) {
        return axios(request);
    }

    static async api(request) {
        if (!request.headers) {
            request.headers = {};
        }
        request.headers["authorization"] = await _IndexedDB.get("authorization");
        return new Promise((resolve, reject) => {
            this.request(request).then(async res => {
                await _IndexedDB.set("authorization", res.headers["authorization"] || "");
                if (!res.hasOwnProperty("data")) {
                    reject(res);
                    return;
                }
                if (!res.data.hasOwnProperty("code")) {
                    reject(res);
                    return;
                }
                switch (parseInt(res.data.code)) {
                    case 0:
                        resolve(res.data.data);
                        return;
                    case 1:
                        if (window.location.hash) {
                            if (!window.location.hash.startsWith("#/login?")) {
                                window.location.replace(`/#/login?redirect=${encodeURIComponent(window.location.href)}`)
                            }
                        } else {
                            if (!window.location.href.startsWith("/login?")) {
                                window.location.replace(`/login?redirect=${encodeURIComponent(window.location.href)}`)
                            }
                        }
                        reject(res);
                        return;
                    default:
                        reject(res);
                        return;
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    static async get(url, params) {
        return this.api({
            method: "GET",
            headers: {"Content-Type": this.CONTENT_TYPE.X_WWW_FORM_URLENCODED,},
            url: url,
            params: params,
        })
    }

    static async post(url, data) {
        return this.api({
            method: "POST",
            headers: {"Content-Type": this.CONTENT_TYPE.X_WWW_FORM_URLENCODED,},
            url: url,
            data: qs.stringify(data),
        })
    }

    static async postFormData(url, data) {
        return this.api({
            method: "POST",
            headers: {"Content-Type": this.CONTENT_TYPE.FORM_DATA,},
            url: url,
            data: (() => {
                let fd = new FormData();
                for (let name in data) {
                    fd.append(name, data[name])
                }
                return fd
            })(),
        })
    }

    static async postJson(url, data) {
        return this.api({
            method: "POST",
            headers: {"Content-Type": this.CONTENT_TYPE.JSON,},
            url: url,
            data: data,
        })
    }

}
