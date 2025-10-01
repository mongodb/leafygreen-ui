const React = require('react');
const structuredClonePolyfill = require('./polyfills/structuredClone');

if (React.version.startsWith('17')) {
  throw new Error(
    'Using React 18 test setup script with React 17 installed is not supported.' +
      '\nTo test in a React 17 environment, use `--react17` when running tests',
  );
}

const { createRoot } = require('react-dom/client');
const { TextEncoder } = require('util');

// As of Jest 24 (https://jestjs.io/blog/2019/01/25/jest-24-refreshing-polished-typescript-friendly#breaking-changes)
// this is no longer included by default for async tests
// So we're including it so we can use async/await
require('regenerator-runtime/runtime');

// Polyfill structuredClone for Jest environment
// Required by ESLint's flat config system in Node.js 18+
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = structuredClonePolyfill;
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

global.TextEncoder = TextEncoder;

const domNode = document.createElement('div');
const root = createRoot(domNode);
root.render(React.createElement(React.StrictMode, []));
