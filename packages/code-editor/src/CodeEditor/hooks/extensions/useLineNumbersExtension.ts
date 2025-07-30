import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

export function useLineNumbersExtension({
  editorViewInstance,
  props,
  modules,
}: {
  editorViewInstance: EditorView | null;
  props: Partial<CodeEditorProps>;
  modules: Partial<CodeEditorModules>;
}) {
  return useExtension({
    editorViewInstance,
    stateModule: modules?.['@codemirror/state'],
    value: {
      enable: props.enableLineNumbers,
      module: modules?.['@codemirror/view'],
    },
    factory: ({ enable, module }) =>
      enable && module ? module.lineNumbers() : [],
  });
}
