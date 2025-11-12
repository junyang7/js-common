export default class _Object {

    static merge(target, source) {
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === "object" && source[key] !== null && !Array.isArray(source[key])) {
                    if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key])) {
                        target[key] = {};
                    }
                    this.merge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }

}
