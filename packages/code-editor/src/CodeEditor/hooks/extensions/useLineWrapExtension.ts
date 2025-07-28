import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';

/**
 * Hook that provides line wrapping functionality for CodeMirror editors.
 * This hook creates and manages a CodeMirror extension for text wrapping
 * that can be toggled on/off.
 *
 * @param params Configuration object for the line wrap extension
 * @param params.editorView The CodeMirror EditorView instance to attach the extension to
 * @param params.stateModule CodeMirror state module (`@codemirror/state`) for creating the compartment (marked optional for lazy loading, but required for functionality)
 * @param params.enableLineWrapping Flag to enable/disable line wrapping
 * @param params.viewModule CodeMirror view module (`@codemirror/view`) needed for line wrapping functionality (marked optional for lazy loading, but required for functionality)
 * @returns A CodeMirror extension that enables line wrapping when both enableLineWrapping is true and viewModule is provided
 *
 * @remarks
 * Note: Although several parameters are marked as optional in the type signature (due to lazy loading),
 * the extension will only be fully functional once all required modules are provided. The hook safely handles
 * the case where modules aren't immediately available by returning an empty extension array.
 * This pattern allows the component to render immediately while modules are being loaded asynchronously.
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
