const React = require('react');
const { createRoot } = require('react-dom/client');
const {TextEncoder} = require('util')

// As of Jest 24 (https://jestjs.io/blog/2019/01/25/jest-24-refreshing-polished-typescript-friendly#breaking-changes)
// this is no longer included by default for async tests
// So we're including it so we can use async/await
require('regenerator-runtime/runtime');

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

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

global.TextEncoder = TextEncoder

const domNode = document.createElement('div');
const root = createRoot(domNode); 
root.render(React.createElement(React.StrictMode, []));
