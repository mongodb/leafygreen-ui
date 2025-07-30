import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';

import { useExtension } from './useExtension';

export function usePlaceholderExtension({
  editorView,
  stateModule,
  placeholder,
  viewModule,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  placeholder?: CodeEditorProps['placeholder'];
  viewModule?: typeof import('@codemirror/view');
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      viewModule,
      placeholder,
    },
    factory: ({ viewModule, placeholder }) => {
      return placeholder && viewModule
        ? viewModule.placeholder(placeholder)
        : [];
    },
  });
}
