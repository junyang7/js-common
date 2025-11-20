export default class _Distance {

    static format(m) {
        let km = Math.ceil(m / 100) / 10;
        return km % 1 === 0 ? km : Number(km.toFixed(1));
    }

}
