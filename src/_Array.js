export default class _Array {

    static del(arr, el) {
        const index = arr.indexOf(el);
        if (index !== -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

}
