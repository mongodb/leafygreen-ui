const React = require('react');
const ReactDOM = require('react-dom');

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

const originalRender = ReactDOM.render;

ReactDOM.render = (element, container, callback) => {
  element = React.createElement(React.StrictMode, [], element);
  return originalRender(element, container, callback);
};
