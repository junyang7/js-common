export default class Debug {

    static #debug = process.env.VUE_APP_DEBUG === "true";

    static debug(data) {
        if (this.#debug) {
            console.log(data);
        }
    }

}
