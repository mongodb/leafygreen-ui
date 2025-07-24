import { EditorView } from '@uiw/react-codemirror';

import { useExtension } from './useExtension';

export function useLineWrapExtension(
  view: EditorView | null,
  enableLineWrapping: boolean,
) {
  return useExtension(
    view || null,
    {
      enable: enableLineWrapping,
      module,
    },
    ({ enable }) => (enable ? EditorView.lineWrapping : []),
  );
}
