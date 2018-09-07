const dbPromise = idb.open('budget-store', 1, (db) => {
    if(!db.objectStoreNames.contains('budgets')) {
        db.createObjectStore('budgets', {keyPath: 'id'})
    } 
})

const saveBudget = (st, data) => {
  if('indexedDB' in window) { 
    return dbPromise
      .then(db => {
        const tx = db.transaction(st, 'readwrite');
        const store = tx.objectStore(st);
        store.put(data);
        return tx.complete
      }
    )
}}

const getBudget = (st) => {
  return dbPromise 
    .then((db) => {
      const tx = db.transaction(st, 'readonly');
      const store = tx.objectStore(st);
      return store.get('budget');
    })
}

const clearBudget = (st) => {
  return dbPromise
    .then(db => {
      const tx = db.transaction(st, 'readwrite');
      const store = tx.objectStore(st);
      store.clear();
      return tx.complete;
    })
}