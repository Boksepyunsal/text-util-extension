import type { TextItem } from '../types';

const STORAGE_KEY = 'text_util_items';

const isChromeStorageAvailable = typeof chrome !== 'undefined' && !!chrome.storage && !!chrome.storage.sync;

export const getItems = (): Promise<TextItem[]> => {
  return new Promise((resolve) => {
    if (isChromeStorageAvailable) {
      chrome.storage.sync.get([STORAGE_KEY], (result: { [key: string]: any }) => {
        if (chrome.runtime.lastError) {
          console.error('Storage read error:', chrome.runtime.lastError.message);
          resolve([]);
          return;
        }
        resolve((result[STORAGE_KEY] as TextItem[]) || []);
      });
    } else {
      const stored = localStorage.getItem(STORAGE_KEY);
      resolve(stored ? JSON.parse(stored) : []);
    }
  });
};

export const saveItems = (items: TextItem[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isChromeStorageAvailable) {
      chrome.storage.sync.set({ [STORAGE_KEY]: items }, () => {
        if (chrome.runtime.lastError) {
          console.error('Storage write error:', chrome.runtime.lastError.message);
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        resolve();
      });
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      resolve();
    }
  });
};