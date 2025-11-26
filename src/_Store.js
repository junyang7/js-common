export default class _Store {

    static #_;

    static init(v = {}) {
        this.#_ = v;
    }

    static set(path, value) {
        const segments = path.split(/\.|\[(\d+)\]/).filter(s => s !== undefined && s !== "");
        let current = this.#_;
        for (let i = 0; i < segments.length; i++) {
            let key = segments[i];
            const isLast = i === segments.length - 1;
            const nextKey = segments[i + 1];
            const isArray = /^\d+$/.test(key);
            key = isArray ? Number(key) : key;
            if (isLast) {
                current[key] = value;
                return;
            }
            const nextIsArray = /^\d+$/.test(nextKey);
            if (isArray) {
                if (!Array.isArray(current)) {
                    throw new Error(`期望数组，但不是数组（key=${key}）`);
                }
                if (current[key] === undefined) {
                    if (nextIsArray) {
                        current[key] = [];
                    } else {
                        current[key] = {};
                    }
                } else if (nextIsArray && !Array.isArray(current[key])) {
                    throw new Error(`类型冲突，期望数组`);
                } else if (!nextIsArray && (typeof current[key] !== "object" || Array.isArray(current[key]))) {
                    throw new Error(`类型冲突，期望对象`);
                }
            } else {
                if (current[key] === undefined) {
                    if (nextIsArray) {
                        current[key] = [];
                    } else {
                        current[key] = {};
                    }
                } else if (nextIsArray && !Array.isArray(current[key])) {
                    throw new Error(`类型冲突，期望数组`);
                } else if (!nextIsArray && (typeof current[key] !== "object" || Array.isArray(current[key]))) {
                    throw new Error(`类型冲突，期望对象`);
                }
            }
            current = current[key];
        }
    }

    static get(path) {
        const segments = path.split(/\.|\[(\d+)\]/).filter(s => s !== undefined && s !== "");
        let current = this.#_;
        for (let key of segments) {
            const isArray = /^\d+$/.test(key);
            key = isArray ? Number(key) : key;
            if (current == null) {
                return undefined;
            }
            current = current[key];
        }
        return current;
    }

    static toString() {
        return JSON.stringify(this.#_);
    }

}
