
export class Storage {

  get(keys) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(keys, (items) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(items);
        }
      })
    });
  }

  set(structure) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(structure, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(structure);
        }
      })
    });
  }

}