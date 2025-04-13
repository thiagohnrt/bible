export class IDB {
  private readonly settings: SettingsIDB;

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
            store.indexs?.forEach((index) => objStore.createIndex(index.name, index.keyPath, index.options));
          }
        });
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = (event) => {
        reject(new Error((event.target as IDBOpenDBRequest).error?.message ?? "Unknown error occurred"));
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
        reject(new Error(request.error?.message ?? "An error occurred"));
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
        request.onerror = () => reject(new Error(request.error?.message ?? "An error occurred"));
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(new Error(transaction.error?.message ?? "Transaction error occurred"));
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
        reject(new Error(request.error?.message ?? "An unknown error occurred"));
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
        reject(new Error(request.error?.message ?? "An unknown error occurred"));
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
        reject(new Error(request.error?.message ?? "An unknown error occurred"));
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
        request.onerror = () => reject(new Error(request.error?.message ?? "An unknown error occurred"));
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(new Error(transaction.error?.message ?? "Transaction error occurred"));
    });
  }

  async delete(storeName: string, indexName: string, query: IDBValidKey | IDBKeyRange): Promise<void> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);

      const request = index.openCursor(query);

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        } else {
          resolve();
        }
      };

      request.onerror = () => {
        reject(new Error(request.error?.message ?? "An unknown error occurred"));
      };
    });
  }

  async deleteAll(storeName: string): Promise<void> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error(request.error?.message ?? "An unknown error occurred"));
      };
    });
  }

  async getIndexedDBInfo(): Promise<DBInfo> {
    const db = await this.openDatabase();
    return new Promise(async (resolve, reject) => {
      const objectStoreNames = Array.from(db.objectStoreNames);
      const dbInfo: DBInfo = {
        dbName: this.settings.name,
        tables: [],
        estimatedTotalSizeBytes: 0,
        estimatedTotalSizeFormatted: "0 Bytes",
      };

      try {
        for (const storeName of objectStoreNames) {
          const tableInfo = await this.getObjectStoreSize(db, storeName);
          dbInfo.tables.push(tableInfo);
          dbInfo.estimatedTotalSizeBytes += tableInfo.estimatedSizeBytes;
        }

        dbInfo.estimatedTotalSizeFormatted = this.formatSize(dbInfo.estimatedTotalSizeBytes);

        db.close();
        resolve(dbInfo);
      } catch (error) {
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }

  private async getObjectStoreSize(db: IDBDatabase, storeName: string): Promise<TableInfo> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const size: TableInfo = { storeName, estimatedSizeBytes: 0, estimatedSizeFormatted: "0 Bytes", count: 0 };

      const cursorRequest = store.openCursor();

      cursorRequest.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;

        if (cursor) {
          const recordSize = JSON.stringify(cursor.value).length;
          size.estimatedSizeBytes += recordSize;
          size.count++;
          cursor.continue();
        } else {
          size.estimatedSizeFormatted = this.formatSize(size.estimatedSizeBytes);
          resolve(size);
        }
      };

      cursorRequest.onerror = (event) => {
        const error = (event.target as IDBRequest).error;
        reject(new Error(`Error reading store ${storeName}: ${error?.message ?? "Unknown error"}`));
      };
    });
  }

  private formatSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
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

type TableInfo = {
  storeName: string;
  estimatedSizeBytes: number;
  estimatedSizeFormatted: string;
  count: number;
};

export type DBInfo = {
  dbName: string;
  tables: TableInfo[];
  estimatedTotalSizeBytes: number;
  estimatedTotalSizeFormatted: string;
};
