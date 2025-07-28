import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';

export function useHyperLinkExtension({
  editorView,
  stateModule,
  enableClickableUrls,
  hyperLinkModule,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  enableClickableUrls: boolean;
  hyperLinkModule?: typeof import('@uiw/codemirror-extensions-hyper-link');
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      enable: enableClickableUrls,
      module: hyperLinkModule,
    },
    factory: ({ enable, module }) =>
      enable && module?.hyperLink ? module.hyperLink : [],
  });
}
