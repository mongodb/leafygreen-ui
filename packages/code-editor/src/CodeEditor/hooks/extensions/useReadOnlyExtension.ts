import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';

/**
 * Hook that provides read-only functionality for CodeMirror editors.
 * This hook creates and manages a CodeMirror extension that controls
 * whether the editor content can be modified by the user.
 *
 * @param params Configuration object for the read-only extension
 * @param params.editorView The CodeMirror EditorView instance to attach the extension to
 * @param params.stateModule CodeMirror state module for creating the compartment (marked optional for lazy loading, but required for functionality)
 * @param params.readOnly Flag to enable/disable read-only mode
 * @returns A CodeMirror extension that enables read-only mode when readOnly is true and stateModule is provided
 *
 * @remarks
 * Note: Although stateModule is marked as optional in the type signature (due to lazy loading),
 * the compartment will not be created until stateModule is provided. The hook safely handles
 * the case where it's not immediately available by returning an empty extension array.
 */
export function useReadOnlyExtension({
  editorView,
  stateModule,
  readOnly,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  readOnly: boolean;
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      enable: readOnly,
      module: stateModule,
    },
    factory: ({ enable, module }) =>
      enable && module ? module.EditorState.readOnly.of(true) : [],
  });
}
