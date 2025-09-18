import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../moduleLoaders.types';

import { useExtension } from './useExtension';

/**
 * Hook for managing line number display in the CodeMirror editor.
 *
 * This extension adds line numbers to the editor's gutter when enabled.
 * The line numbers are displayed on the left side of the editor and help
 * users navigate and reference specific lines in the code.
 *
 * @param params - Configuration object
 * @param params.editorViewInstance - The CodeMirror editor view instance
 * @param params.props - Partial CodeEditor props containing the enableLineNumbers flag
 * @param params.modules - Module dependencies (requires @codemirror/view for lineNumbers)
 * @returns A CodeMirror extension that displays line numbers
 */
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
