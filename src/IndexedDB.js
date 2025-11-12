export default class IndexedDB {

    static #db = null;
    static #dbName = "ziji.fun";
    static #dbVersion = 1;
    static #storeName = "kv";

    static async #open() {
        return new Promise((resolve, reject) => {
            if (this.#db) {
                return resolve(this.#db);
            }
            const request = indexedDB.open(this.#dbName, this.#dbVersion);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.#storeName)) {
                    db.createObjectStore(this.#storeName);
                }
            };
            request.onsuccess = (event) => {
                this.#db = event.target.result;
                resolve(this.#db);
            };
            request.onerror = (event) => reject(event.target.error);
        });
    }

    static async set(k, v) {
        await this.#open();
        return new Promise((resolve, reject) => {
            const tx = this.#db.transaction(this.#storeName, "readwrite");
            const store = tx.objectStore(this.#storeName);
            const request = store.put(v, k);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    static async get(k) {
        await this.#open();
        return new Promise((resolve, reject) => {
            const tx = this.#db.transaction(this.#storeName, "readonly");
            const store = tx.objectStore(this.#storeName);
            const request = store.get(k);
            request.onsuccess = () => resolve(request.result ?? null);
            request.onerror = () => reject(request.error);
        });
    }

    static async del(k) {
        await this.#open();
        return new Promise((resolve, reject) => {
            const tx = this.#db.transaction(this.#storeName, "readwrite");
            const store = tx.objectStore(this.#storeName);
            const request = store.delete(k);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

}
