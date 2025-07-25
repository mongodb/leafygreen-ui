import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';

export function useLineWrapExtension(
  view: EditorView | null,
  enableLineWrapping: boolean,
  module?: typeof import('@codemirror/view'),
) {
  return useExtension(
    view || null,
    {
      enable: enableLineWrapping,
      module,
    },
    ({ enable, module }) =>
      enable && module ? module.EditorView.lineWrapping : [],
  );
}
