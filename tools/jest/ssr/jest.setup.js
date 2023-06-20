const { Script } = require('vm');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const { Context } = require('@leafygreen-ui/testing-lib');

class ArtificialServerContext {
  // Get a clean Node global object, since the current one has been modified with JSDOM
  static cleanNodeGlobal = new Script('globalThis').runInNewContext({
    process,
    Buffer,
  });

  [Context.enter] = () => {
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
  };
}

// Handle packages that detect existence of the document or window at module load time.
// We preload these packages so they load in a server context.
Context.within(new ArtificialServerContext(), () => {
  require('@emotion/cache');
  require('@emotion/react');
  require('@leafygreen-ui/emotion');
});

const { CacheProvider } = require('@emotion/react');
const { cache, extractCritical } = require('@leafygreen-ui/emotion');

const stylesToCleanup = new Set();
let registeredStyleCleanup = false;

ReactDOM.render = (element, container, callback) => {
  element = React.createElement(CacheProvider, { value: cache }, element);

  if (!container._reactRootContainer) {
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
  }

  return ReactDOM.hydrate(element, container, callback);
};
