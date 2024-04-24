import { openDB } from "idb";

// Function to open or create the IndexedDB database
async function openDatabase() {
  const db = await openDB("MyDatabase", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("recipes")) {
        db.createObjectStore("recipes", { keyPath: "id", autoIncrement: true });
      }
    },
  });

  return db;
}

// Export the openDatabase function
export default openDatabase;
