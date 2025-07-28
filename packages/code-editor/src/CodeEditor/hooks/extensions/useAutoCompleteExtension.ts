import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';
import { LanguageName } from './useLanguageExtension';

/**
 * Hook that provides autocompletion functionality for CodeMirror editors.
 * This hook creates and manages a CodeMirror extension for autocompletion
 * that can be dynamically updated when the language or modules change.
 *
 * @param params Configuration object for the autocomplete extension
 * @param params.editorView The CodeMirror EditorView instance to attach the extension to
 * @param params.stateModule CodeMirror state module for creating the compartment (marked optional for lazy loading, but required for functionality)
 * @param params.language Optional language identifier to enable language-specific autocompletion
 * @param params.autoCompleteModule Optional CodeMirror autocomplete module reference
 * @returns A CodeMirror extension that enables autocompletion when both language and autoCompleteModule are provided
 *
 * @remarks
 * Note: Although stateModule is marked as optional in the type signature (due to lazy loading),
 * the compartment will not be created until stateModule is provided. The hook safely handles
 * the case where it's not immediately available by returning an empty extension array.
 */
export function useAutoCompleteExtension({
  editorView,
  stateModule,
  language,
  autoCompleteModule,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  language?: LanguageName;
  autoCompleteModule?: typeof import('@codemirror/autocomplete');
}) {
  return useExtension({
    editorView,
    stateModule,
    value: { language, autoCompleteModule },
    factory: ({ language, autoCompleteModule }) =>
      language && autoCompleteModule ? autoCompleteModule.autocompletion() : [],
  });
}
