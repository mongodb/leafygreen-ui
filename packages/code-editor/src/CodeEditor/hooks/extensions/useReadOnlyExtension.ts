import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

export function useReadOnlyExtension({
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
      enable: props.readOnly,
      module: modules?.['@codemirror/state'],
    },
    factory: ({ enable, module }) =>
      enable && module ? module.EditorState.readOnly.of(true) : [],
  });
}
