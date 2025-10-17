import React from 'react';
import { type ComponentType, createElement, Fragment } from 'react';
import { renderToString } from 'react-dom/server';
import { esmConfig } from '@lg-tools/build/config/rollup.config.mjs';
import { createUIResource } from '@mcp-ui/server';
import { MergedRollupOptions, rollup } from 'rollup';

// SSR
export const DemoTwigUIRenderer = <P extends {} = {}>(
  microUI: ComponentType<P>,
  props?: P,
) => {
  const str = renderToString(createElement<P>(microUI, props));
  return str;
};

// Given a React.ComponentType, Returns a MCP UIResource
export const createUIResourceFromMicroUIAsRawHtml = <P extends {} = {}>(
  microUI: ComponentType<P>,
  props?: P,
) => {
  // Get all styles from the current document
  const allStyleTags = Array.from(document.querySelectorAll('style'));
  const stylesContent = allStyleTags.map(s => s.innerHTML).join('\n');

  const id = microUI.displayName || 'component';
  // Server-side render the component
  const renderedMicroUi = renderToString(
    createElement(Fragment, null, [
      stylesContent,
      createElement<P>(microUI, props),
    ]),
  );

  return createUIResource({
    uri: `ui://twig-ui/${id}`,
    content: {
      type: 'rawHtml',
      htmlString: renderedMicroUi,
    },
    encoding: 'blob',
  });
};

// Given a React.ComponentType, Returns a MCP UIResource
export const createUIResourceFromMicroUIAsRemoteDom = <P extends {} = {}>(
  microUI: ComponentType<P>,
  props?: P,
) => {
  // Get all styles from the current document
  const allStyleTags = Array.from(document.querySelectorAll('style'));
  const stylesContent = allStyleTags.map(s => s.innerHTML).join('\n');

  // Server-side render the component
  const renderedMicroUi = renderToString(createElement<P>(microUI, props));

  // Serialize props for client-side hydration
  const serializedProps = JSON.stringify(props || {});

  // Get the component code as a string (this is a simplified approach)
  // In production, you'd want to bundle this properly
  const componentCode = microUI.toString();
  const id = microUI.displayName || 'component';

  const script = `
    // Wait for React and ReactDOM to load
    function initializeApp() {
      const React = window.React;
      const ReactDOM = window.ReactDOM;
      
      if (!React || !ReactDOM) {
        setTimeout(initializeApp, 100);
        return;
      }

      // Inject styles
      const styleEl = document.createElement('style');
      styleEl.textContent = ${JSON.stringify(stylesContent)};
      document.head.appendChild(styleEl);

      // Inject the pre-rendered HTML
      root.innerHTML = ${JSON.stringify(renderedMicroUi)};

      // Hydrate the component for interactivity
      const props = ${serializedProps};
      
      // Import/recreate the component
      ${componentCode}
      
      // Hydrate the root
      const reactRoot = ReactDOM.createRoot(root);
      reactRoot.render(React.createElement(${id || 'Component'}, props));
    }

    // Load React scripts
    const reactScript = document.createElement('script');
    reactScript.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
    reactScript.crossOrigin = 'anonymous';
    document.head.appendChild(reactScript);

    const reactDomScript = document.createElement('script');
    reactDomScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
    reactDomScript.crossOrigin = 'anonymous';
    reactDomScript.onload = initializeApp;
    document.head.appendChild(reactDomScript);
  `;

  return createUIResource({
    uri: `ui://twig-ui/${microUI.displayName || 'component'}`,
    content: {
      type: 'remoteDom',
      script: script,
      framework: 'react',
    },
    encoding: 'blob',
  });
};

// Alternative approach: Create a complete HTML document with bundled dependencies
// This is more robust for complex components
export const createUIResourceFromMicroUIAsEmbeddedUrl = async <
  P extends {} = {},
>(
  microUI: ComponentType<P>,
  props?: P,
) => {
  // Super hacky—copy all styles from the storybook iframe to render in the mcp-ui iframe.
  // We'll want to embed the stylesheet in a better way
  const allStyleTags = Array.from(document.querySelectorAll('style'));
  const stylesContent = allStyleTags.map(s => s.innerHTML).join('\n');

  const id = microUI.displayName || 'component';
  // Server-side render the component
  const renderedMicroUiHTML = renderToString(createElement<P>(microUI, props));

  // bundle the component with rollup
  const srcFile = `./${id}.tsx`;
  const rollupConfig = { input: srcFile, ...esmConfig };

  // Serialize props for data attribute
  const serializedProps = JSON.stringify(props || {});

  // Create a complete HTML document
  const htmlDocument = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${stylesContent}</style>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
</head>
<body>
  <div id="root">${renderedMicroUiHTML}</div>
  <script type="module">
    document.addEventListener('DOMContentLoaded', function () {
      console.log('Loaded external url');
      const root = ReactDOM.hydrateRoot(
        document.getElementById('root'),
        ${createElement(microUI, props)}
      );
    });
  </script>
</body>
</html>
  `;

  await fetch('http://localhost:43210/serve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, html: htmlDocument }),
  }).catch(err => {
    console.error('Is the server running at port 43210?');
  });

  console.log('Serving UI with id', id);

  return createUIResource({
    uri: `ui://twig-ui/${id}`,
    content: {
      type: 'externalUrl',
      iframeUrl: `http://localhost:43210/ui/?id=${id}`,
    },
    encoding: 'text',
  });
};
