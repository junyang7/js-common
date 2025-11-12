import Vue from 'vue';
import Vuex from 'vuex';

if (!(Vue._installedPlugins || []).includes(Vuex)) {
    Vue.use(Vuex);
}

export default class _VueXStore {
    static #instance;

    static getInstance(state) {
        if (this.#instance == null) {
            this.#instance = new Vuex.Store({
                state: state,
                mutations:
                    {
                        set(state, {path, value}) {
                            const keys = path.split('.');
                            const lastKey = keys.pop();
                            let target = state;
                            for (const key of keys) {
                                if (!target[key] || typeof target[key] !== 'object') {
                                    Vue.set(target, key, {});
                                }
                                target = target[key];
                            }
                            Vue.set(target, lastKey, value);
                        },
                        del(state, {path}) {
                            const keys = path.split('.');
                            const lastKey = keys.pop();
                            let target = state;
                            for (const key of keys) {
                                if (!target[key] || typeof target[key] !== 'object') {
                                    return;
                                }
                                target = target[key];
                            }
                            Vue.delete(target, lastKey);
                        },
                        push(state, {path, value}) {
                            const keys = path.split('.');
                            const lastKey = keys.pop();
                            let target = state;
                            for (const key of keys) {
                                if (!target[key] || typeof target[key] !== 'object') {
                                    Vue.set(target, key, {});
                                }
                                target = target[key];
                            }
                            if (Array.isArray(target[lastKey])) {
                                target[lastKey].push(value);
                                Vue.set(target, lastKey, target[lastKey]);
                            } else {
                                // console.error(`The path "${path}" is not an array.`);
                            }
                        },
                        unshift(state, {path, value}) {
                            const keys = path.split('.');
                            const lastKey = keys.pop();
                            let target = state;
                            for (const key of keys) {
                                if (!target[key] || typeof target[key] !== 'object') {
                                    Vue.set(target, key, {});
                                }
                                target = target[key];
                            }
                            if (Array.isArray(target[lastKey])) {
                                target[lastKey].unshift(value);
                                Vue.set(target, lastKey, target[lastKey]);
                            } else {
                                // console.error(`The path "${path}" is not an array.`);
                            }
                        },
                    },
                actions: {
                    async set({commit, state}, {path, value}) {
                        commit('set', {path, value});
                        if (!state.isInitialized) {
                            return;
                        }
                        // try {
                        //     await saveStateToStorage({state: this.state});
                        // } catch (err) {
                        //     console.error("Error saving to IndexedDB:", err);
                        // }
                    },
                    async del({commit, state}, {path}) {
                        commit('del', {path});
                        if (!state.isInitialized) {
                            return;
                        }
                        // try {
                        //     await saveStateToStorage({state: this.state});
                        // } catch (err) {
                        //     console.error("Error saving to IndexedDB:", err);
                        // }
                    },
                    async push({commit, state}, {path, value}) {
                        commit('push', {path, value});
                        if (!state.isInitialized) {
                            return;
                        }
                        // try {
                        //     await saveStateToStorage({state: this.state});
                        // } catch (err) {
                        //     console.error("Error saving to IndexedDB:", err);
                        // }
                    },
                    async unshift({commit, state}, {path, value}) {
                        commit('unshift', {path, value});
                        if (!state.isInitialized) {
                            return;
                        }
                        // try {
                        //     await saveStateToStorage({state: this.state});
                        // } catch (err) {
                        //     console.error("Error saving to IndexedDB:", err);
                        // }
                    },
                    init({commit, state}) {
                        // TODO
                    },
                },
                getters: {
                    get: (state) => (path) => {
                        let keys = path.split(".");
                        return keys.reduce((acc, key) => acc[key], state);
                    },
                },
                plugins: [
                    (store) => {
                        store.dispatch("init");
                    }
                ],
            });
        }
        return this.#instance;
    }

}
