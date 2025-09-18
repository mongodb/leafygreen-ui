// As of Jest 24 (https://jestjs.io/blog/2019/01/25/jest-24-refreshing-polished-typescript-friendly#breaking-changes)
// this is no longer included by default for async tests
// So we're including it so we can use async/await
require('regenerator-runtime/runtime');

// Polyfill structuredClone for Jest environment
// Required by ESLint's flat config system in Node.js 18+
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = function (obj) {
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
  };
}

global.MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
