import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../moduleLoaders.types';

import { useExtension } from './useExtension';

/**
 * Hook for managing clickable URL functionality in the CodeMirror editor.
 *
 * When enabled, this extension automatically detects URLs in the editor content
 * and makes them clickable. Users can click on URLs to open them in a new tab,
 * improving the interactivity of the editor when viewing code with embedded links.
 *
 * @param params - Configuration object
 * @param params.editorViewInstance - The CodeMirror editor view instance
 * @param params.props - Partial CodeEditor props containing the enableClickableUrls flag
 * @param params.modules - Module dependencies (requires @uiw/codemirror-extensions-hyper-link for hyperLink)
 * @returns A CodeMirror extension that enables clickable URLs
 */
export function useHyperLinkExtension({
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
      enable: props.enableClickableUrls,
      module: modules?.['@uiw/codemirror-extensions-hyper-link'],
    },
    factory: ({ enable, module }) =>
      enable && module?.hyperLink ? module.hyperLink : [],
  });
}
