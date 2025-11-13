import Vue from 'vue';

export default class _VueEvent {

    static #instance = null;

    static #init() {
        if (this.#instance == null) {
            this.#instance = new Vue();
        }
    }

    static produce(event, ...args) {
        this.#init();
        this.#instance.$emit(event, ...args);
    }

    static consume(event, handler) {
        this.#init();
        this.#instance.$on(event, handler);
    }

    static destroy(event, handler) {
        this.#init();
        this.#instance.$off(event, handler);
    }

}
