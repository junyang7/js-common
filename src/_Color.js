export default class _Color {

    static convertHexToRgb(hex) {
        hex = hex.trim().replace("#", "");
        if (hex.length === 3) {
            hex = hex.split("").map(function (c) {
                return c + c;
            }).join("");
        }
        if (hex.length !== 6) {
            throw new Error("invalid hex color");
        }
        const num = parseInt(hex, 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `${r},${g},${b}`;
    }

}
