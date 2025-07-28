import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';

export function useLineWrapExtension({
  editorView,
  stateModule,
  enableLineWrapping,
  viewModule,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  enableLineWrapping: boolean;
  viewModule?: typeof import('@codemirror/view');
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      enable: enableLineWrapping,
      module: viewModule,
    },
    factory: ({ enable, module }) =>
      enable && module ? module.EditorView.lineWrapping : [],
  });
}
