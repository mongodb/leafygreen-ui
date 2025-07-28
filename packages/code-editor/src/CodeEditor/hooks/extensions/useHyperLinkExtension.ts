import { type EditorView } from '@codemirror/view';

import { useExtension } from './useExtension';

/**
 * Hook that provides clickable URLs functionality for CodeMirror editors.
 * This hook creates and manages a CodeMirror extension for hyperlink detection
 * that can be toggled on/off.
 *
 * @param params Configuration object for the hyperlink extension
 * @param params.editorView The CodeMirror EditorView instance to attach the extension to
 * @param params.stateModule CodeMirror state module (`@codemirror/state`) for creating the compartment (marked optional for lazy loading, but required for functionality)
 * @param params.enableClickableUrls Flag to enable/disable clickable URLs functionality
 * @param params.hyperLinkModule Hyperlink module (`@uiw/codemirror-extensions-hyper-link`) reference needed for URL detection (marked optional for lazy loading, but required for functionality)
 * @returns A CodeMirror extension that enables clickable URLs when both enableClickableUrls is true and hyperLinkModule is provided
 *
 * @remarks
 * Note: Although several parameters are marked as optional in the type signature (due to lazy loading),
 * the extension will only be fully functional once all required modules are provided. The hook safely handles
 * the case where modules aren't immediately available by returning an empty extension array.
 * This pattern allows the component to render immediately while modules are being loaded asynchronously.
 */
export function useHyperLinkExtension({
  editorView,
  stateModule,
  enableClickableUrls,
  hyperLinkModule,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  enableClickableUrls: boolean;
  hyperLinkModule?: typeof import('@uiw/codemirror-extensions-hyper-link');
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      enable: enableClickableUrls,
      module: hyperLinkModule,
    },
    factory: ({ enable, module }) =>
      enable && module?.hyperLink ? module.hyperLink : [],
  });
}
