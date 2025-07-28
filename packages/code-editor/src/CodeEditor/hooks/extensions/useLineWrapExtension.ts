import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';

/**
 * Hook that provides line wrapping functionality for CodeMirror editors.
 * This hook creates and manages a CodeMirror extension for text wrapping
 * that can be toggled on/off.
 *
 * @param params Configuration object for the line wrap extension
 * @param params.editorView The CodeMirror EditorView instance to attach the extension to
 * @param params.stateModule CodeMirror state module for creating the compartment (marked optional for lazy loading, but required for functionality)
 * @param params.enableLineWrapping Flag to enable/disable line wrapping
 * @param params.viewModule Optional CodeMirror view module needed for line wrapping functionality
 * @returns A CodeMirror extension that enables line wrapping when both enableLineWrapping is true and viewModule is provided
 *
 * @remarks
 * Note: Although stateModule is marked as optional in the type signature (due to lazy loading),
 * the compartment will not be created until stateModule is provided. The hook safely handles
 * the case where it's not immediately available by returning an empty extension array.
 */
export function useLineWrapExtension({
  editorView,
  stateModule,
  enableLineWrapping,
  viewModule,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  enableLineWrapping: boolean;
  viewModule?: typeof import('@codemirror/view');
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      enable: enableLineWrapping,
      module: viewModule,
    },
    factory: ({ enable, module }) =>
      enable && module ? module.EditorView.lineWrapping : [],
  });
}
