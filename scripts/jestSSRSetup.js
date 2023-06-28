const React = require('react');
const ReactDOMServer = require('react-dom/server');
// const { Context } = require('@leafygreen-ui/testing-lib');
const { hydrateRoot } = require('react-dom/client');
const { CacheProvider } = require('@emotion/react');
const { cache, extractCritical } = require('@leafygreen-ui/emotion');

// class ArtificialServerContext {
//   // Get a clean Node global object, since the current one has been modified with JSDOM
//   static cleanNodeGlobal = new Script('globalThis').runInNewContext({
//     process,
//     Buffer,
//   });

//   [Context.enter] = () => {
//     this.Window = Object.getPrototypeOf(global);
//     Object.setPrototypeOf(global, null);

//     // Restore the global object to without JSDOM
//     this.jsdomProperties = {};
//     Object.entries(Object.getOwnPropertyDescriptors(global)).forEach(
//       ([key, descriptor]) => {
//         if (
//           !Object.prototype.hasOwnProperty.call(
//             ArtificialServerContext.cleanNodeGlobal,
//             key,
//           )
//         ) {
//           this.jsdomProperties[key] = descriptor;
//           delete global[key];
//         }
//       },
//     );
//   };

//   [Context.exit] = () => {
//     Object.defineProperties(global, this.jsdomProperties);
//     Object.setPrototypeOf(global, this.Window);
//   };
// }

// // Handle packages that detect existence of the document or window at module load time.
// // We preload these packages so they load in a server context.
// Context.within(new ArtificialServerContext(), () => {
//   require('@emotion/cache');
//   require('@emotion/react');
//   require('@leafygreen-ui/emotion');
// });

const domNode = document.createElement('div');
const stylesToCleanup = new Set();
let registeredStyleCleanup = false;

const Environment = ({ children }) => {
  const element = <CacheProvider value={cache}>{children}</CacheProvider>;

  React.useEffect(() => {
    // const { html, css, ids } = extractCritical(
    //   Context.within(new ArtificialServerContext(), () =>
    //     ReactDOMServer.renderToString(element),
    //   ),
    // );
    const { html, css, ids } = extractCritical(
      ReactDOMServer.renderToString(element),
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

      stylesToCleanup.forEach(style => {
        style.remove();
        stylesToCleanup.delete(style);
      });
    }

    domNode.innerHTML = html;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return element;
};

// eslint-disable-next-line no-unused-vars
const root = hydrateRoot(domNode, <Environment />);
