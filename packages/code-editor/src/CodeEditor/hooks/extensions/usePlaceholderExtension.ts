import { type EditorView } from '@codemirror/view';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

/**
 * Hook for managing placeholder text in the CodeMirror editor.
 *
 * This extension displays placeholder text when the editor is empty,
 * providing users with helpful hints about what they should enter.
 * The placeholder text appears with dimmed styling and disappears
 * when the user starts typing.
 *
 * @param params - Configuration object
 * @param params.editorViewInstance - The CodeMirror editor view instance
 * @param params.props - Partial CodeEditor props containing the placeholder text
 * @param params.modules - Module dependencies (requires @codemirror/view for placeholder)
 * @returns A CodeMirror extension that displays placeholder text
 */
export function usePlaceholderExtension({
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
      viewModule: modules?.['@codemirror/view'],
      placeholder: props.placeholder,
    },
    factory: ({ viewModule, placeholder }) => {
      return placeholder && viewModule
        ? viewModule.placeholder(placeholder)
        : [];
    },
  });
}
