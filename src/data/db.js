import { openDB } from 'idb';

async function createDatabase() {
  const db = await openDB('MyDatabase', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('recipes')) {
        db.createObjectStore('recipes', { keyPath: 'id', autoIncrement: true });
      }
    },
  });

  return db;
}

export default createDatabase;