import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps, IndentUnits } from '../../CodeEditor.types';

import { useExtension } from './useExtension';

export function useIndentExtension(
  view: EditorView | null,
  unit: CodeEditorProps['indentUnit'],
  size: CodeEditorProps['indentSize'],
  module?: typeof import('@codemirror/language'),
  stateModule?: typeof import('@codemirror/state'),
) {
  return useExtension(
    view || null,
    {
      unit,
      size,
      module,
      stateModule,
    },
    /**
     * Size is given a default because if unit is set and size is not, some size
     * is required.
     */
    ({ unit, size = 2, module, stateModule }) => {
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
  );
}
