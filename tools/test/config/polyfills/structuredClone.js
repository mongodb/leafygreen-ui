/**
 * Polyfill for structuredClone in Jest environment
 *
 * Added in Node 18+, but not available in Jest by default.
 * Required by ESLint's flat config system.
 * Uses JSON serialization for basic object cloning.
 *
 * @param {any} obj - The object to clone
 * @returns {any} A deep clone of the input object
 */
function structuredClone(obj) {
  // Handle primitive values and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    // Fallback for non-serializable objects
    if (Array.isArray(obj)) {
      return obj.map(item => globalThis.structuredClone(item));
    }

    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = globalThis.structuredClone(obj[key]);
      }
    }
    return cloned;
  }
}

module.exports = structuredClone;
