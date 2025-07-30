import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

export function usePlaceholderExtension({
  editorViewInstance,
  props,
  modules,
}: {
  editorViewInstance: EditorView | null;
  props: Partial<CodeEditorProps>;
  modules: Partial<CodeEditorModules>;
}) {
  return useExtension({
    editorView: editorViewInstance,
    stateModule: modules?.['@codemirror/state'],
    value: {
      viewModule: modules?.['@codemirror/view'],
      placeholder: props.placeholder,
    },
    factory: ({ viewModule, placeholder }) => {
      return placeholder && viewModule
        ? viewModule.placeholder(placeholder)
        : [];
    },
  });
}
