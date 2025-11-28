export default class _Array {

    static del(arr, el) {
        return arr.filter(item => item !== el);
    }

    static delByKey(arr, key, keyValue) {
        return arr.filter(item => item[key] !== keyValue);
    }

    static findIndexByKey(arr, key, keyValue) {
        return arr.findIndex(item => item[key] === keyValue);
    }

}
