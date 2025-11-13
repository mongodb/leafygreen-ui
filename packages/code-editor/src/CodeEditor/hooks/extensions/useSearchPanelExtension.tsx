import React from 'react';
import ReactDOM from 'react-dom';

import { SearchPanel } from '../../../SearchPanel';
import { CodeEditorProps } from '../../CodeEditor.types';
import { CodeEditorModules } from '../moduleLoaders.types';

export function useSearchPanelExtension({
  props,
  modules,
  hasPanel,
}: {
  props: Partial<CodeEditorProps>;
  modules: Partial<CodeEditorModules>;
  hasPanel: boolean;
}) {
  const { enableSearchPanel, darkMode, baseFontSize } = props;
  const searchModule = modules?.['@codemirror/search'];

  /** If enableSearchPanel is undefined, we default to true */
  if (enableSearchPanel === false || !searchModule) {
    return [];
  }

  const searchPanelExtension = searchModule.search({
    createPanel: view => {
      const dom = document.createElement('div');

      const baseStyles = {
        position: 'absolute',
        top: '0',
        right: '-1px',
        left: '0',
        display: 'flex',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        paddingBottom: '5px', // accounts for childs shadow
      };

      Object.assign(dom.style, baseStyles);

      if (!hasPanel) {
        dom.style.borderTopRightRadius = '12px';
        dom.style.borderTopLeftRadius = '12px';
      }

      const isReact17 = React.version.startsWith('17');

      const searchPanelElement = (
        <SearchPanel
          view={view}
          darkMode={darkMode}
          baseFontSize={baseFontSize}
          hasPanel={true}
        />
      );

      /**
       * This conditional logic is crucial for ensuring the component uses the best rendering
       * API for the environment it's in.
       *
       * While `ReactDOM.render` works in both React 17 and 18, using it in a React 18
       * application is highly discouraged because it forces the app into a legacy,
       * synchronous mode. This disables all of React 18's concurrent features, such as
       * automatic batching and transitions, sacrificing performance and responsiveness.
       *
       * By checking the version, we can:
       * 1. Use the modern `createRoot` API in React 18 to opt-in to all its benefits.
       * 2. Provide a backward-compatible fallback with `ReactDOM.render` for React 17.
       *
       * We disable the `react/no-deprecated` ESLint rule for the React 17 path because
       * we are using these functions intentionally.
       */
      if (isReact17) {
        // --- React 17 Fallback Path ---
        // eslint-disable-next-line react/no-deprecated
        ReactDOM.render(searchPanelElement, dom);

        return {
          dom,
          top: true,
          // eslint-disable-next-line react/no-deprecated
          unmount: () => ReactDOM.unmountComponentAtNode(dom),
        };
      } else {
        // --- React 18+ Path ---

        /**
         * We use require() instead of import() here to avoid TypeScript build errors
         * in React 17 environments. While import() would be more idiomatic for dynamic
         * imports, TypeScript attempts to resolve 'react-dom/client' types at compile
         * time even for dynamic imports, causing the build to fail when this module
         * doesn't exist (React 17). The require() call bypasses this strict type
         * checking, allowing the code to build for both React 17 and 18, while still
         * loading the module correctly at runtime when React 18 is detected.
         */
        const { createRoot } = require('react-dom/client');
        const root = createRoot(dom);
        root.render(searchPanelElement);

        return {
          dom,
          top: true,
          unmount: () => root.unmount(),
        };
      }
    },
  });

  return searchPanelExtension;
}
