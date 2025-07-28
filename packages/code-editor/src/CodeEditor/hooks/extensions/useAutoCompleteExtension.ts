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
 * @param params.stateModule CodeMirror state module (`@codemirror/state`) for creating the compartment (marked optional for lazy loading, but required for functionality)
 * @param params.language Language identifier to enable language-specific autocompletion (marked optional for lazy loading, but required for functionality)
 * @param params.autoCompleteModule CodeMirror autocomplete module (`@codemirror/autocomplete`) reference (marked optional for lazy loading, but required for functionality)
 * @returns A CodeMirror extension that enables autocompletion when both language and autoCompleteModule are provided
 *
 * @remarks
 * Note: Although several parameters are marked as optional in the type signature (due to lazy loading),
 * the extension will only be fully functional once all required modules are provided. The hook safely handles
 * the case where modules aren't immediately available by returning an empty extension array.
 * This pattern allows the component to render immediately while modules are being loaded asynchronously.
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
