import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';

export function useReadOnlyExtension(
  view: EditorView | null,
  enableReadOnly: boolean,
  module?: typeof import('@codemirror/state'),
) {
  return useExtension(
    view || null,
    {
      enable: enableReadOnly,
      module,
    },
    ({ enable, module }) =>
      enable && module ? module.EditorState.readOnly.of(true) : [],
  );
}
