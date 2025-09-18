const React = require('react');

if (React.version.startsWith('17')) {
  throw new Error(
    'Using React 18 test setup script with React 17 installed is not supported.' +
      '\nTo test in a React 17 environment, use `--react17` when running tests',
  );
}

const { createRoot } = require('react-dom/client');
const { TextEncoder } = require('util');

global.TextEncoder = TextEncoder;

const domNode = document.createElement('div');
const root = createRoot(domNode);
root.render(React.createElement(React.StrictMode, []));
