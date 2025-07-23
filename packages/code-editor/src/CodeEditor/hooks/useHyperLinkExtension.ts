import { type EditorView } from '@uiw/react-codemirror';

import { useExtension } from './useExtension';

// TODO: Just take in the module that's needed
export function useHyperLinkExtension(
  view: EditorView | null,
  modules: {
    '@uiw/codemirror-extensions-hyper-link'?: typeof import('@uiw/codemirror-extensions-hyper-link');
  },
  enableClickableUrls: boolean,
) {
  return useExtension(
    view || null,
    {
      enable: enableClickableUrls,
      module: modules['@uiw/codemirror-extensions-hyper-link'],
    },
    ({ enable, module }) =>
      enable && module?.hyperLink ? module.hyperLink : [],
  );
}
