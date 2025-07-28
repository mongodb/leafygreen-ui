import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';

export function useLineNumbersExtension({
  editorView,
  stateModule,
  enableLineNumbers,
  viewModule,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  enableLineNumbers: boolean;
  viewModule?: typeof import('@codemirror/view');
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      enable: enableLineNumbers,
      module: viewModule,
    },
    factory: ({ enable, module }) =>
      enable && module ? module.lineNumbers() : [],
  });
}
