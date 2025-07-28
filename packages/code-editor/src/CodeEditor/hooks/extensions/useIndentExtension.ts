import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps, IndentUnits } from '../../CodeEditor.types';

import { useExtension } from './useExtension';

export function useIndentExtension({
  editorView,
  stateModule,
  indentUnit,
  indentSize,
  languageModule,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  indentUnit: CodeEditorProps['indentUnit'];
  indentSize: CodeEditorProps['indentSize'];
  languageModule?: typeof import('@codemirror/language');
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      unit: indentUnit,
      size: indentSize,
      module: languageModule,
      stateModule,
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
