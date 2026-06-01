const PREFIX = "powerapp:";
const legacyAppKeyPattern = /^(activeTab|themeMode|hasOnboarded|learn_|connect_|prepare_|tonight_|session_|reflect_)/;

const scopedKey = (key) => key.startsWith(PREFIX) ? key : `${PREFIX}${key}`;

/**
 * Safely retrieves data from localStorage with error handling and fallbacks.
 * @param {string} key - The key to retrieve.
 * @param {any} fallback - The fallback value if retrieval or parsing fails.
 * @returns {any} The parsed value or fallback.
 */
export const getLocal = (key, fallback) => {
  try {
    const item = localStorage.getItem(scopedKey(key)) ?? localStorage.getItem(key);
    if (item === null) return fallback;
    
    // Check if the item is a string that looks like JSON
    if (typeof item === 'string' && (item.startsWith('{') || item.startsWith('['))) {
      return JSON.parse(item);
    }
    
    return item;
  } catch {
    return fallback;
  }
};

/**
 * Safely saves data to localStorage.
 * @param {string} key - The key to save.
 * @param {any} value - The value to save.
 */
export const setLocal = (key, value) => {
  try {
    const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(scopedKey(key), valueToStore);
  } catch {
    // Ignore storage failures so private browsing restrictions do not crash the app.
  }
};

/**
 * Removes a specific key from localStorage.
 * @param {string} key - The key to remove.
 */
export const removeLocal = (key) => {
  try {
    localStorage.removeItem(scopedKey(key));
    localStorage.removeItem(key);
  } catch {
    // Ignore storage failures so private browsing restrictions do not crash the app.
  }
};

/**
 * Clears all app-specific data from localStorage.
 */
export const clearAllLocal = () => {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX) || legacyAppKeyPattern.test(key))
      .forEach(key => localStorage.removeItem(key));
  } catch {
    // Ignore storage failures so private browsing restrictions do not crash the app.
  }
};
