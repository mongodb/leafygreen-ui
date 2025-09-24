import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../moduleLoaders.types';

import { useExtension } from './useExtension';

/**
 * Hook for managing autocompletion functionality in the CodeMirror editor.
 *
 * This extension provides intelligent code completion suggestions based on the
 * selected language. It offers context-aware suggestions for language keywords,
 * functions, variables, and other language-specific constructs to improve
 * coding efficiency and reduce errors.
 *
 * @param params - Configuration object
 * @param params.editorViewInstance - The CodeMirror editor view instance
 * @param params.props - Partial CodeEditor props containing the language setting
 * @param params.modules - Module dependencies (requires @codemirror/autocomplete for autocompletion)
 * @returns A CodeMirror extension that provides autocompletion
 */
export function useAutoCompleteExtension({
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
      language: props.language,
      autoCompleteModule: modules?.['@codemirror/autocomplete'],
    },
    factory: ({ language, autoCompleteModule }) =>
      language && autoCompleteModule ? autoCompleteModule.autocompletion() : [],
  });
}
