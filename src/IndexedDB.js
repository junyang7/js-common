export default class IndexedDB {

    #db = null;
    #dbName = "";
    #dbVersion = "";
    #storeName = "";
    #keyPath = "";


    async open(dbName, dbVersion, storeName, keyPath) {
        return new Promise((resolve, reject) => {
            if (this.#db) {
                return resolve(this.#db);
            }
            this.#dbName = dbName;
            this.#dbVersion = dbVersion;
            this.#storeName = storeName;
            this.#keyPath = keyPath;
            const request = indexedDB.open(this.#dbName, this.#dbVersion);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.#storeName)) {
                    db.createObjectStore(this.#storeName, {keyPath: this.#keyPath});
                }
            };
            request.onsuccess = (event) => {
                this.#db = event.target.result;
                resolve(this.#db);
            };
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async add(row) {
        if (!this.#db) {
            throw new Error("数据库未打开")
        }
        return new Promise((resolve, reject) => {
            const tx = this.#db.transaction(this.#storeName, "readwrite");
            const store = tx.objectStore(this.#storeName);
            const request = store.add(row);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async del(key) {
        if (!this.#db) {
            throw new Error("数据库未打开")
        }
        return new Promise((resolve, reject) => {
            const tx = this.#db.transaction(this.#storeName, "readwrite");
            const store = tx.objectStore(this.#storeName);
            const request = store.delete(key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async set(row) {
        if (!this.#db) {
            throw new Error("数据库未打开")
        }
        return new Promise((resolve, reject) => {
            const tx = this.#db.transaction(this.#storeName, "readwrite");
            const store = tx.objectStore(this.#storeName);
            const request = store.put(row);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getList() {
        if (!this.#db) {
            throw new Error("数据库未打开")
        }
        return new Promise((resolve, reject) => {
            const tx = this.#db.transaction(this.#storeName, "readonly");
            const store = tx.objectStore(this.#storeName);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

}
