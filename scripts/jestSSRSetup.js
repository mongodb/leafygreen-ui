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

// Handle packages that detect existence of the document or window at module load time.
// We preload these packages so they load in a server context.
Context.within(new ArtificialServerContext(), () => {
  require('@emotion/cache');
  require('use-ssr');
});

const { CacheProvider } = require('@emotion/core');
const { cache } = require('@leafygreen-ui/emotion');

const stylesToCleanup = new Set();
let registeredStyleCleanup = false;

function insertStylesFromEmotion() {
  if (typeof document !== 'undefined') {
    let style = document.querySelector('[data-emotion-css]');

    if (!style) {
      style = document.createElement('style');
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
    }

    const ids = Object.keys(cache.inserted).join(' ');
    style.setAttribute('data-emotion-css', ids);
    style.innerHTML = Object.values(cache.inserted).join('');
  }
}

// Since Emotion was initialized in a server context, it won't append
// new styles to the document when new CSS classes are created. We have
// to detect when new classes are created and update the styles of the
// page when that happens.
cache.inserted = new Proxy(cache.inserted, {
  set: (target, prop, value) => {
    target[prop] = value;
    insertStylesFromEmotion();
    return true;
  },
});

ReactDOM.render = (element, container, callback) => {
  element = React.createElement(CacheProvider, { value: cache }, element);

  if (!container._reactRootContainer) {
    container.innerHTML = Context.within(new ArtificialServerContext(), () =>
      ReactDOMServer.renderToString(element),
    );

    // Client-only Emotion renders the style tags inline, but SSR requires
    // manually adding the style tags https://emotion.sh/docs/ssr#on-server
    insertStylesFromEmotion();
  }

  return ReactDOM.hydrate(element, container, callback);
};
