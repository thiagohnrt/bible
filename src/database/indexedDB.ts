export class IDB {
  private settings: SettingsIDB;

  constructor(settings: SettingsIDB) {
    this.settings = settings;
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error("IndexedDB is not supported by your browser."));
      }

      const request = indexedDB.open(this.settings.name, this.settings.version);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.settings.stores.forEach((store) => {
          if (!db.objectStoreNames.contains(store.name)) {
            const objStore = db.createObjectStore(store.name, store);
            store.indexs?.forEach((index) => {
              objStore.createIndex(index.name, index.keyPath, index.options);
            });
          }
        });
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  async add<T = any>(storeName: string, value: T): Promise<number> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      const request = store.add(value);

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async addAll<T = any>(storeName: string, values: T[]): Promise<void> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      values.forEach((value) => {
        const request = store.add(value);
        request.onerror = () => reject(request.error);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async get<T = any>(storeName: string, query: IDBValidKey | IDBKeyRange): Promise<T> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName]);
      const store = transaction.objectStore(storeName);

      const request = store.get(query);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getAll<T = any>(storeName: string, indexName?: string, range?: any): Promise<T[]> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName]);
      const store = transaction.objectStore(storeName);
      let request: IDBRequest;

      if (indexName) {
        const index = store.index(indexName);
        request = index.openCursor(IDBKeyRange.only(range));
      } else {
        request = store.openCursor();
      }

      const results: T[] = [];
      request.onsuccess = (event: Event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue | null>).result;
        if (cursor) {
          results.push(cursor.value as T);
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async update<T = any>(storeName: string, value: T): Promise<number> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      const request = store.put(value);

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async updateAll<T = any>(storeName: string, values: T[]): Promise<void> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      values.forEach((value) => {
        const request = store.put(value);
        request.onerror = () => reject(request.error);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async delete(storeName: string, query: IDBValidKey | IDBKeyRange): Promise<void> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      const request = store.delete(query);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}

interface IndexStoreIDB {
  name: string;
  keyPath: string | Iterable<string>;
  options?: IDBIndexParameters;
}

interface StoreIDB extends IDBObjectStoreParameters {
  name: string;
  indexs?: IndexStoreIDB[];
}

interface SettingsIDB {
  name: string;
  version: number;
  stores: StoreIDB[];
}
