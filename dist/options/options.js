
import { Storage } from '../services/storage.service.js';

class Options {

  categories = {};
  list = {};

  exportElement;
  importElement;
  fileInputElement;

  storage = new Storage();

  constructor() {
    this.initListeners();
    this.initStorage();
  }

  async initStorage() {
    const { categories, list } = await this.storage.get(['categories', 'list']);
    this.categories = categories;
    this.list = list;
  }

  initListeners() {
    this.exportElement = document.getElementById('export');
    this.exportElement.addEventListener('click', this.exportData.bind(this));

    this.importElement = document.getElementById('import');
    this.importElement.addEventListener('click', this.importData.bind(this));

    this.fileInputElement = document.getElementById('selectFiles');
    this.fileInputElement.addEventListener('change', this.processFiles.bind(this));
  }

  addCategory() {}

  addQuote() {}

  exportData () {
    const content = JSON.stringify({
      categories: this.categories,
      list: this.list
    }, null, 2);
    console.log(content);
    const anchor = document.createElement('a');
    const file = new Blob([content], { type: 'application/json' });
    anchor.href = URL.createObjectURL(file);
    anchor.download = 'twitter-data.json';
    anchor.click();
  }

  importData () {
    this.fileInputElement.click();
  }

  processFiles() {
    const files = this.fileInputElement.files;
    if (files.length <= 0) return;

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const result = JSON.parse(event.target.result);
      console.log(result);
      this.categories = result.categories;
      this.list = result.list;
      this.storage.set({
        categories: this.categories,
        list: this.list
      });
    };

    fileReader.readAsText(files.item(0));
  }
}

const options = new Options();
