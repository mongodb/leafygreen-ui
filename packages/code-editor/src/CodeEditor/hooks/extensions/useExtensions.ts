import { type EditorView } from 'codemirror';

import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../moduleLoaders.types';

import { useAutoCompleteExtension } from './useAutoCompleteExtension';
import { useCodeFoldingExtension } from './useCodeFoldingExtension';
import { useHighlightExtension } from './useHighlightExtension';
import { useHyperLinkExtension } from './useHyperLinkExtension';
import { useIndentExtension } from './useIndentExtension';
import { useLanguageExtension } from './useLanguageExtension';
import { useLineNumbersExtension } from './useLineNumbersExtension';
import { useLineWrapExtension } from './useLineWrapExtension';
import { usePlaceholderExtension } from './usePlaceholderExtension';
import { useReadOnlyExtension } from './useReadOnlyExtension';
import { useThemeExtension } from './useThemeExtension';
import { useTooltipExtension } from './useTooltipExtension';

/**
 * Custom hook that aggregates and configures all CodeMirror extensions for the CodeEditor component.
 *
 * This hook manages the initialization and configuration of various CodeMirror extensions including:
 * - Auto-completion
 * - Code folding
 * - Syntax highlighting
 * - Hyperlinks
 * - Line wrapping
 * - Line numbers
 * - Indentation
 * - Placeholder text
 * - Tooltips
 * - Language support
 * - Theme styling
 * - Read-only mode
 *
 * @param params - Configuration object for the extensions
 * @param params.editorViewInstance - The CodeMirror EditorView instance, or null if not yet initialized
 * @param params.props - Partial CodeEditor props containing user configuration options
 * @param params.modules - Partial CodeEditor modules containing dynamically loaded CodeMirror modules
 * @returns An array of configured CodeMirror extensions ready to be applied to the editor
 */
export function useExtensions({
  editorViewInstance,
  props,
  modules,
  hasPanel,
}: {
  editorViewInstance: EditorView | null;
  props: Partial<CodeEditorProps>;
  modules: Partial<CodeEditorModules>;
  hasPanel: boolean;
}) {
  const baseFontSize = useBaseFontSize();

  const autoCompleteExtension = useAutoCompleteExtension({
    editorViewInstance,
    props,
    modules,
  });

  const codeFoldingExtension = useCodeFoldingExtension({
    editorViewInstance,
    props,
    modules,
  });

  const highlightExtension = useHighlightExtension({
    editorViewInstance,
    props: props,
    modules,
  });

  const hyperLinkExtension = useHyperLinkExtension({
    editorViewInstance,
    props,
    modules,
  });

  const lineWrapExtension = useLineWrapExtension({
    editorViewInstance,
    props,
    modules,
  });

  const lineNumbersExtension = useLineNumbersExtension({
    editorViewInstance,
    props,
    modules,
  });

  const indentExtension = useIndentExtension({
    editorViewInstance,
    props,
    modules,
  });

  const placeholderExtension = usePlaceholderExtension({
    editorViewInstance,
    props,
    modules,
  });

  const tooltipExtension = useTooltipExtension({
    editorViewInstance,
    props,
    modules,
  });

  const languageExtension = useLanguageExtension({
    editorViewInstance,
    props,
    modules,
  });

  const themeExtension = useThemeExtension({
    editorViewInstance,
    props: {
      ...props,
      baseFontSize,
    },
    modules,
    hasPanel,
  });

  const readOnlyExtension = useReadOnlyExtension({
    editorViewInstance,
    props,
    modules,
  });

  return [
    autoCompleteExtension,
    highlightExtension,
    hyperLinkExtension,
    lineWrapExtension,
    lineNumbersExtension,
    codeFoldingExtension, // Order matters here, code folding must be after line numbers
    indentExtension,
    placeholderExtension,
    tooltipExtension,
    languageExtension,
    themeExtension,
    readOnlyExtension,
  ];
}
