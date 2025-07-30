import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps, IndentUnits } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

export function useIndentExtension({
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
      unit: props.indentUnit,
      size: props.indentSize,
      module: modules?.['@codemirror/language'],
      stateModule: modules?.['@codemirror/state'],
    },
    /**
     * Size is given a default because if unit is set and size is not, some size
     * is required.
     */
    factory: ({ unit, size = 2, module, stateModule }) => {
      if (!module || unit === undefined || !stateModule) {
        return [];
      }

      let indentString: string;

      if (unit === IndentUnits.Tab) {
        indentString = '\t';
      } else {
        indentString = ' '.repeat(size);
      }

      return [
        module.indentUnit.of(indentString),
        stateModule.EditorState.tabSize.of(size),
      ];
    },
  });
}
