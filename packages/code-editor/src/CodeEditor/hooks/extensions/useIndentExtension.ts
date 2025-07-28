import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps, IndentUnits } from '../../CodeEditor.types';

import { useExtension } from './useExtension';

/**
 * Hook that configures indentation settings for CodeMirror editors.
 * This hook creates and manages a CodeMirror extension for indentation
 * that controls indent type (tabs vs spaces) and size.
 *
 * @param params Configuration object for the indentation extension
 * @param params.editorView The CodeMirror EditorView instance to attach the extension to
 * @param params.stateModule CodeMirror state module for creating the compartment (marked optional for lazy loading, but required for functionality)
 * @param params.indentUnit The type of indentation to use ('spaces' or 'tabs')
 * @param params.indentSize The number of spaces for each indentation level
 * @param params.languageModule Optional CodeMirror language module needed for language-aware indentation
 * @returns A CodeMirror extension that configures indentation behavior
 *
 * @remarks
 * Note: Although stateModule is marked as optional in the type signature (due to lazy loading),
 * the compartment will not be created until stateModule is provided. The hook safely handles
 * the case where it's not immediately available by returning an empty extension array.
 */
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
