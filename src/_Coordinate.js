export default class _Coordinate {

    static #A = 6378137; // 6378245
    static #EE = 0.00669342162296594323;
    static #VR = Math.PI / 180;
    static #MR = 180 / Math.PI;
    static #YR = 6378137;
    static #EPSG3857MACLAT = 85.0511287798;

    static #rad(d) {
        return d * Math.PI / 180.0;
    }

    static #isOutOfChina(lngLat) {
        const [lon, lat] = lngLat;
        if (lon < 72.004 || lon > 137.8347) return true;
        if (lat < 0.8293 || lat > 55.8271) return true;
        return false;
    }

    static #transformLat(x, y) {
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    static #transformLon(x, y) {
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;
        return ret;
    }

    static #transform(lngLat) {
        const [lon, lat] = lngLat;
        if (this.#isOutOfChina(lngLat)) {
            return [lon, lat];
        }
        let dLat = this.#transformLat(lon - 105.0, lat - 35.0);
        let dLon = this.#transformLon(lon - 105.0, lat - 35.0);
        let radLat = lat / 180.0 * Math.PI;
        let magic = Math.sin(radLat);
        magic = 1 - this.#EE * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((this.#A * (1 - this.#EE)) / (magic * sqrtMagic) * Math.PI);
        dLon = (dLon * 180.0) / (this.#A / sqrtMagic * Math.cos(radLat) * Math.PI);
        return [lon + dLon, lat + dLat];
    }

    static convertWGS84ToGCJ02(lngLat) {
        const [lon, lat] = lngLat;
        if (this.#isOutOfChina(lngLat)) {
            return [lon, lat];
        }
        let dLat = this.#transformLat(lon - 105.0, lat - 35.0);
        let dLon = this.#transformLon(lon - 105.0, lat - 35.0);
        let radLat = lat / 180.0 * Math.PI;
        let magic = Math.sin(radLat);
        magic = 1 - this.#EE * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((this.#A * (1 - this.#EE)) / (magic * sqrtMagic) * Math.PI);
        dLon = (dLon * 180.0) / (this.#A / sqrtMagic * Math.cos(radLat) * Math.PI);
        return [lon + dLon, lat + dLat];
    }

    static convertGCJ02ToBD09(lngLat) {
        const [lon, lat] = lngLat;
        let x = lon, y = lat;
        let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * Math.PI);
        let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * Math.PI);
        let bdLon = z * Math.cos(theta) + 0.0065;
        let bdLat = z * Math.sin(theta) + 0.006;
        return [bdLon, bdLat];
    }

    static convertBD09ToGCJ02(lngLat) {
        const [bdLon, bdLat] = lngLat;
        let x = bdLon - 0.0065, y = bdLat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);
        let gcjLon = z * Math.cos(theta);
        let gcjLat = z * Math.sin(theta);
        return [gcjLon, gcjLat];
    }

    static convertGCJ02ToWGS84(lngLat) {
        const [lon, lat] = this.#transform(lngLat);
        let wgsLon = lngLat[0] * 2 - lon;
        let wgsLat = lngLat[1] * 2 - lat;
        return [wgsLon, wgsLat];
    }

    static getWGS84Distance(lngLatFrom, lngLatTo) {
        const [lon1, lat1] = lngLatFrom;
        const [lon2, lat2] = lngLatTo;
        let radLat1 = this.#rad(lat1);
        let radLat2 = this.#rad(lat2);
        let a = radLat1 - radLat2;
        let b = this.#rad(lon1) - this.#rad(lon2);
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * this.#A
        return s;
    }

    static getGCJ02Distance(lngLatFrom, lngLatTo) {
        const {lon: lon1Wgs, lat: lat1Wgs} = this.convertGCJ02ToWGS84(lngLatFrom);
        const {lon: lon2Wgs, lat: lat2Wgs} = this.convertGCJ02ToWGS84(lngLatTo);
        return this.getWGS84Distance([lon1Wgs, lat1Wgs], [lon2Wgs, lat2Wgs]);
    }

    static getBD09Distance(lngLatFrom, lngLatTo) {
        const {lon: lon1Gcj, lat: lat1Gcj} = this.convertBD09ToGCJ02(lngLatFrom);
        const {lon: lon2Gcj, lat: lat2Gcj} = this.convertBD09ToGCJ02(lngLatTo);
        return this.getGCJ02Distance([lon1Gcj, lat1Gcj], [lon2Gcj, lat2Gcj]);
    }

    static getAngle(lngLatFrom, lngLatTo) {
        let lonA = lngLatFrom[0] * Math.PI / 180;
        let latA = lngLatFrom[1] * Math.PI / 180;
        let lonB = lngLatTo[0] * Math.PI / 180;
        let latB = lngLatTo[1] * Math.PI / 180;
        let dLon = lonB - lonA;
        let x = Math.cos(latA) * Math.sin(latB) - Math.sin(latA) * Math.cos(latB) * Math.cos(dLon);
        let y = Math.sin(dLon) * Math.cos(latB);
        return Math.atan2(y, x) * 180 / Math.PI;
    }

    static convertLngLatToXY(lngLat) {
        let lng = lngLat[0];
        let lat = lngLat[1];
        lat = Math.max(Math.min(this.#EPSG3857MACLAT, lat), -this.#EPSG3857MACLAT);
        return [
            this.#YR * lng * this.#VR,
            this.#YR * Math.log(Math.tan(Math.PI / 4 + lat * this.#VR / 2))
        ];
    }

    static convertXYToLngLat(xy) {
        let x = xy[0];
        let y = xy[1];
        return [
            x / this.#YR * this.#MR,
            (2 * Math.atan(Math.exp(y / this.#YR)) - Math.PI / 2) * this.#MR
        ];
    }

    static distance(p1, p2) {
        const rad = this.#VR;
        const lat1 = p1[1] * rad;
        const lng1 = p1[0] * rad;
        const lat2 = p2[1] * rad;
        const lng2 = p2[0] * rad;
        const dLng = lng2 - lng1;
        const a = (1 - Math.cos(lat2 - lat1) + (1 - Math.cos(dLng)) * Math.cos(lat1) * Math.cos(lat2)) / 2;
        return 2 * this.#YR * Math.asin(Math.sqrt(a));
    }

    static distancePToPath(p, path) {
        let s = Infinity;
        for (let i = 0; i < path.length - 1; i++) {
            s = Math.min(s, this.distancePToP1P2(p, path[i], path[i + 1]));
        }
        return s;
    }

    static distancePToP1P2(p, p1, p2) {
        return this.distance(p, this.pToP1P2(p, p1, p2));
    }

    static pToP1P2(p, p1, p2) {
        let xy = this.convertLngLatToXY(p);
        let xy1 = this.convertLngLatToXY(p1);
        let xy2 = this.convertLngLatToXY(p2);
        const x = xy[0], y = xy[1];
        const x1 = xy1[0], y1 = xy1[1];
        const x2 = xy2[0], y2 = xy2[1];
        const dx = x2 - x1;
        const dy = y2 - y1;
        const lenSquared = dx * dx + dy * dy;
        if (lenSquared < 1e-10) {
            return p1;
        }
        let t = (dx * (x - x1) + dy * (y - y1)) / lenSquared;
        t = Math.max(0, Math.min(1, t));
        return this.convertXYToLngLat(
            [
                x1 + t * dx,
                y1 + t * dy
            ]
        );
    }

}
