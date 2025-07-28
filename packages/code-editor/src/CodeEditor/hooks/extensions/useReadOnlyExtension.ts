import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';

export function useReadOnlyExtension({
  editorView,
  stateModule,
  readOnly,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  readOnly: boolean;
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      enable: readOnly,
      module: stateModule,
    },
    factory: ({ enable, module }) =>
      enable && module ? module.EditorState.readOnly.of(true) : [],
  });
}
