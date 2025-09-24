function structuredClone(obj) {
  // Simple polyfill using JSON parse/stringify for basic cloning
  // This works for the types of objects ESLint uses in its config system
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
