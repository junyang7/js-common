import axios from "axios";

axios.defaults.withCredentials = true;

export default class Axios {

    static async request(request) {
        return axios(request);
    }

    static async api(request) {
        return new Promise((resolve, reject) => {
            this.request(request).then(res => {
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
                        // 特殊失败，无权限
                        // TODO 例如跳转登录页面
                        return;
                    default:
                        // 其他失败
                        // TODO 正常报错
                        reject(res);
                        return;
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    static async get(uri, params) {
        return this.api(
            {
                method: "GET",
                headers: {"Content-Type": "application/x-www-form-urlencoded",},
                url: uri,
                params: params,
            }
        );
    }

    static async postFormData(uri, data) {
        return this.api(
            {
                method: "POST",
                headers: {"Content-Type": "multipart/form-data",},
                url: uri,
                data: (() => {
                    let fd = new FormData();
                    for (let name in data) {
                        fd.append(name, data[name]);
                    }
                    return fd;
                })(),
            }
        );
    }

    static async postJson(uri, data) {
        return this.api(
            {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                url: uri,
                data: data,
            }
        );
    }

}
