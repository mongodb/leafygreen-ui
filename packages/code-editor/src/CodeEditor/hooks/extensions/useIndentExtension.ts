import { EditorState, type EditorView } from '@uiw/react-codemirror';

import { type CodeEditorProps, IndentUnits } from '../../CodeEditor.types';

import { useExtension } from './useExtension';

export function useIndentExtension(
  view: EditorView | null,
  unit: CodeEditorProps['indentUnit'],
  size: CodeEditorProps['indentSize'],
  module?: typeof import('@codemirror/language'),
) {
  return useExtension(
    view || null,
    {
      unit,
      size,
      module,
    },
    /**
     * Size is given a default because if unit is set and size is not, some size
     * is required.
     */
    ({ unit, size = 2, module }) => {
      if (!module || !module.indentUnit || unit === undefined) {
        return [];
      }

      let indentString: string;

      if (unit === IndentUnits.Tab) {
        indentString = '\t';
      } else {
        indentString = ' '.repeat(size);
      }

      return [module.indentUnit.of(indentString), EditorState.tabSize.of(size)];
    },
  );
}
