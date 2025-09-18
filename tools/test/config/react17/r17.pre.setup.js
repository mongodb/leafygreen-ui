const React = require('react');
const ReactDOM = require('react-dom');

const originalRender = ReactDOM.render;

ReactDOM.render = (element, container, callback) => {
  element = React.createElement(React.StrictMode, [], element);
  return originalRender(element, container, callback);
};
