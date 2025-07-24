import { type EditorView } from '@uiw/react-codemirror';

import { useExtension } from './useExtension';

export function useHyperLinkExtension(
  view: EditorView | null,
  enableClickableUrls: boolean,
  module?: typeof import('@uiw/codemirror-extensions-hyper-link'),
) {
  return useExtension(
    view || null,
    {
      enable: enableClickableUrls,
      module,
    },
    ({ enable, module }) =>
      enable && module?.hyperLink ? module.hyperLink : [],
  );
}
