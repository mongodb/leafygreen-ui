import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

/**
 * Hook for managing the read-only state of the CodeMirror editor.
 *
 * When enabled, this extension prevents users from editing the content
 * of the editor, making it effectively read-only. The extension is
 * dynamically updated based on the `readOnly` prop.
 *
 * @param params - Configuration object
 * @param params.editorViewInstance - The CodeMirror editor view instance
 * @param params.props - Partial CodeEditor props containing the readOnly flag
 * @param params.modules - Module dependencies (requires @codemirror/state for EditorState.readOnly)
 * @returns A CodeMirror extension that controls read-only behavior
 */
export function useReadOnlyExtension({
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
      enable: props.readOnly,
      module: modules?.['@codemirror/state'],
    },
    factory: ({ enable, module }) =>
      enable && module ? module.EditorState.readOnly.of(true) : [],
  });
}
