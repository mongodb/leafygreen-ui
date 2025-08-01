import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

/**
 * Hook for managing line wrapping functionality in the CodeMirror editor.
 *
 * When enabled, this extension allows long lines to wrap to the next line
 * instead of extending horizontally beyond the editor width. This improves
 * readability and eliminates the need for horizontal scrolling.
 *
 * @param params - Configuration object
 * @param params.editorViewInstance - The CodeMirror editor view instance
 * @param params.props - Partial CodeEditor props containing the enableLineWrapping flag
 * @param params.modules - Module dependencies (requires @codemirror/view for EditorView.lineWrapping)
 * @returns A CodeMirror extension that enables line wrapping
 */
export function useLineWrapExtension({
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
      enable: props.enableLineWrapping,
      module: modules?.['@codemirror/view'],
    },
    factory: ({ enable, module }) =>
      enable && module ? module.EditorView.lineWrapping : [],
  });
}
