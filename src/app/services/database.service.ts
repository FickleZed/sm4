import { Injectable, Inject } from "@angular/core";
import { INDEXED_DATABASE_FACTORY_TOKEN } from "app/app.config";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  constructor(@Inject(INDEXED_DATABASE_FACTORY_TOKEN) private indexedDb: IDBFactory) { }

  getDatabase(
    name: string,
    stores: {
      name: string,
      options?: IDBObjectStoreParameters,
      indexes?: { name: string, keyPath: string | string[], options?: IDBIndexParameters }[],
    }[],
    version?: number): Promise<IDBDatabase> {
    const request = this.indexedDb.open(name, version);
    request.onupgradeneeded = (event: any) => {
      const db: IDBDatabase = event.target.result;
      for (const storeDef of stores) {
        const store = db.createObjectStore(storeDef.name, storeDef.options);
        if (storeDef.indexes) {
          for (const index of storeDef.indexes) {
            store.createIndex(index.name, index.keyPath, index.options);
          }
        }
      }
    };
    return this.toResult<IDBDatabase>(request);
  }

  get<T>(database: Promise<IDBDatabase>, storeName: string, key: IDBValidKey): Promise<T> {
    return database
      .then((db) => {
        const transaction = db.transaction(storeName, "readonly");
        const table = transaction.objectStore(storeName);
        return table.get(key);
      })
      .then<T>(this.toResult);
  }

  getAllKeys(database: Promise<IDBDatabase>, storeName: string): Promise<string[]> {
    return database
      .then((db) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        return store.getAllKeys();
      })
      .then<string[]>(this.toResult);
  }

  getAll<T>(database: Promise<IDBDatabase>, storeName: string): Promise<T[]> {
    return database
      .then((db) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        return store.getAll();
      })
      .then<T[]>(this.toResult);
  }

  put<T>(database: Promise<IDBDatabase>, storeName: string, blob: T, key?: IDBValidKey): Promise<void> {
    return database
      .then((db) => {
        const transaction = db.transaction(storeName, "readwrite");
        const table = transaction.objectStore(storeName);
        return table.put(blob, key);
      })
      .then<void>(this.toResult);
  }

  delete(database: Promise<IDBDatabase>, storeName: string, key: IDBValidKey): Promise<void> {
    return database
      .then((db) => {
        const transaction = db.transaction(storeName, "readwrite");
        const table = transaction.objectStore(storeName);
        return table.delete(key);
      })
      .then<void>(this.toResult);
  }

  clear(database: Promise<IDBDatabase>, storeName: string): Promise<void> {
    return database
      .then((db) => {
        const transaction = db.transaction(storeName, "readwrite");
        const table = transaction.objectStore(storeName);
        table.clear();
      });
  }

  clearIndex(database: Promise<IDBDatabase>, storeName: string, indexName: string, indexQuery: string) {
    return database
      .then((db) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const index = store.index(indexName);
        return this.toResult<string[]>(index.getAllKeys(indexQuery))
          .then((keys) => Promise.all(keys.map((key) => this.toResult<void>(store.delete(key)))));
      });
  }

  private toResult = <T>(request: IDBRequest): Promise<T> =>
    new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(event);
      };
    })
}
