const { Script } = require('vm');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const { IdAllocator } = require('@leafygreen-ui/lib');
const { Context } = require('@leafygreen-ui/testing-lib');

class ArtificialServerContext {
  // Get a clean Node global object, since the current one has been modified with JSDOM
  static cleanNodeGlobal = new Script('globalThis').runInNewContext({
    process,
    Buffer,
  });

  [Context.enter] = () => {
    this.idAllocatorSnapshot = IdAllocator.snapshot();

    this.Window = Object.getPrototypeOf(global);
    Object.setPrototypeOf(global, null);

    // Restore the global object to without JSDOM
    this.jsdomProperties = {};
    Object.entries(Object.getOwnPropertyDescriptors(global)).forEach(
      ([key, descriptor]) => {
        if (
          !Object.prototype.hasOwnProperty.call(
            ArtificialServerContext.cleanNodeGlobal,
            key,
          )
        ) {
          this.jsdomProperties[key] = descriptor;
          delete global[key];
        }
      },
    );
  };

  [Context.exit] = () => {
    Object.defineProperties(global, this.jsdomProperties);
    Object.setPrototypeOf(global, this.Window);
    IdAllocator.restore(this.idAllocatorSnapshot);
  };
}

Context.within(new ArtificialServerContext(), () => {
  // Emotion detects whether the document exists at module load time >:(
  // so we have to preload it here so that it doesn't load in a non-server context
  require('@emotion/cache');
});

const { CacheProvider } = require('@emotion/core');
const { cache, extractCritical } = require('@leafygreen-ui/emotion');

// Silence warning about useLayoutEffect:
// |  useLayoutEffect does nothing on the server, because its effect cannot be
// |  encoded into the server renderer's output format. This will lead to a mismatch
// |  between the initial, non-hydrated UI and the intended UI. To avoid this,
// |  useLayoutEffect should only be used in components that render exclusively
// |  on the client. See https://fb.me/react-uselayouteffect-ssr for common fixes.
React.useLayoutEffect = React.useEffect;

const originalRender = ReactDOM.render;

const stylesToCleanup = new Set();
let registeredStyleCleanup = false;

ReactDOM.render = (element, container, callback) => {
  element = React.createElement(CacheProvider, { value: cache }, element);

  if (container._reactRootContainer) {
    // No need to hydrate since component is already mounted
    return originalRender(element, container, callback);
  }

  const { html, css, ids } = extractCritical(
    Context.within(new ArtificialServerContext(), () =>
      ReactDOMServer.renderToString(element),
    ),
  );

  // Client-only Emotion renders the style tags inline, but SSR requires
  // manually adding the style tags https://emotion.sh/docs/ssr#on-server
  const style = document.createElement('style');
  style.setAttribute('data-emotion-css', ids.join(' '));
  style.innerHTML = css;
  document.head.appendChild(style);
  stylesToCleanup.add(style);

  if (!registeredStyleCleanup) {
    registeredStyleCleanup = true;
    afterEach(() => {
      stylesToCleanup.forEach(style => {
        style.remove();
        stylesToCleanup.delete(style);
      });
    });
  }

  container.innerHTML = html;
  return ReactDOM.hydrate(element, container, callback);
};
