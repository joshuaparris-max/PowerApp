/**
 * Safely retrieves data from localStorage with error handling and fallbacks.
 * @param {string} key - The key to retrieve.
 * @param {any} fallback - The fallback value if retrieval or parsing fails.
 * @returns {any} The parsed value or fallback.
 */
export const getLocal = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    
    // Check if the item is a string that looks like JSON
    if (typeof item === 'string' && (item.startsWith('{') || item.startsWith('['))) {
      return JSON.parse(item);
    }
    
    return item;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
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
    localStorage.setItem(key, valueToStore);
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
};

/**
 * Removes a specific key from localStorage.
 * @param {string} key - The key to remove.
 */
export const removeLocal = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};

/**
 * Clears all app-specific data from localStorage.
 */
export const clearAllLocal = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
