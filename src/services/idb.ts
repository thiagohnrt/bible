import { useEffect, useMemo, useState } from "react";

interface Store extends IDBObjectStoreParameters {
  name: string;
}

export interface SettingIDB {
  dbName: string;
  dbVersion: number;
  store: Store;
}

class IDB<T = any> {
  private setting: SettingIDB;

  get storeName(): string {
    return this.setting.store.name;
  }

  constructor(setting: SettingIDB) {
    this.setting = setting;
  }

  openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error("IndexedDB is not supported by your browser."));
      }

      const request = indexedDB.open(this.setting.dbName, this.setting.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, this.setting.store);
        }
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  addData(db: IDBDatabase, data: T): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.add(data);

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  addDataAll(db: IDBDatabase, data: T[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      data.forEach((item) => {
        const request = store.add(item);
        request.onerror = () => reject(request.error);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  getData(db: IDBDatabase, id: number): Promise<T> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName]);
      const store = transaction.objectStore(this.storeName);

      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  updateData(db: IDBDatabase, data: T): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.put(data);

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  updateDataAll(db: IDBDatabase, data: T[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      data.forEach((item) => {
        const request = store.put(item);
        request.onerror = () => reject(request.error);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  deleteData(db: IDBDatabase, id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  deleteDataAll(db: IDBDatabase, ids: number[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      ids.forEach((id) => {
        const request = store.delete(id);
        request.onerror = () => reject(request.error);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
}

export function useIndexedDB<T = any>(setting: SettingIDB) {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const idb = useMemo(() => new IDB<T>(setting), [setting]);

  useEffect(() => {
    idb.openDatabase().then(setDb).catch(console.error);
  }, [idb]);

  return {
    db,
    add: (data: T) => (db ? idb.addData(db, data) : Promise.reject("Database not initialized")),
    addAll: (data: T[]) => (db ? idb.addDataAll(db, data) : Promise.reject("Database not initialized")),
    get: (id: number) => (db ? idb.getData(db, id) : Promise.reject("Database not initialized")),
    update: (data: T) => (db ? idb.updateData(db, data) : Promise.reject("Database not initialized")),
    updateAll: (data: T[]) => (db ? idb.updateDataAll(db, data) : Promise.reject("Database not initialized")),
    delete: (id: number) => (db ? idb.deleteData(db, id) : Promise.reject("Database not initialized")),
    deleteAll: (ids: number[]) => (db ? idb.deleteDataAll(db, ids) : Promise.reject("Database not initialized")),
  };
}
