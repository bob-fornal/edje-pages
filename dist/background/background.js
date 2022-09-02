// background.js
import { Storage } from '../services/storage.service.js';
const storage = new Storage();

let links;
async function init() {
  const r = await fetch('/background/data.json');
  const json = await r.json();

  links = json.links;
}

async function handleInstalled() {
  await init();
  chrome.storage.sync.clear();
  const data = await storage.get(['links']);
  if (!data.hasOwnProperty('links')) {
    await storage.set({ links });
  }
}

chrome.runtime.onInstalled.addListener(handleInstalled);
