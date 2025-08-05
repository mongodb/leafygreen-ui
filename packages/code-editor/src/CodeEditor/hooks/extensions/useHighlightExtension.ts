import { type EditorView } from '@codemirror/view';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  fontWeights,
  InteractionState,
  Variant,
} from '@leafygreen-ui/tokens';

import { type CodeEditorProps } from '../../CodeEditor.types';
import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';

/**
 * Hook for managing syntax highlighting themes in the CodeMirror editor.
 *
 * This extension applies language-specific syntax highlighting with colors
 * that match the LeafyGreen design system. It provides different color schemes
 * for light and dark themes, highlighting various syntax elements like keywords,
 * strings, comments, functions, and more.
 *
 * @param params - Configuration object
 * @param params.editorViewInstance - The CodeMirror editor view instance
 * @param params.props - CodeEditor props including darkMode and language settings
 * @param params.modules - Module dependencies (requires @codemirror/language for syntaxHighlighting and @lezer/highlight for tags)
 * @returns A CodeMirror extension that applies syntax highlighting
 */
export function useHighlightExtension({
  editorViewInstance,
  props,
  modules,
}: {
  editorViewInstance: EditorView | null;
  props: Partial<CodeEditorProps>;
  modules: Partial<CodeEditorModules>;
}) {
  const { theme } = useDarkMode(props.darkMode);

  return useExtension({
    editorViewInstance,
    stateModule: modules?.['@codemirror/state'],
    value: {
      theme,
      language: props.language,
      modules,
    },
    factory: ({ theme, language, modules }) => {
      if (
        !language ||
        !modules ||
        !modules['@codemirror/language'] ||
        !modules['@lezer/highlight']
      ) {
        return [];
      }

      const { tags } = modules['@lezer/highlight'];
      const { syntaxHighlighting, HighlightStyle } =
        modules['@codemirror/language'];

      const highlightStyle = HighlightStyle.define([
        {
          tag: [
            tags.keyword,
            tags.operatorKeyword,
            tags.controlKeyword,
            tags.definitionKeyword,
            tags.tagName,
            tags.modifier,
            tags.changed,
          ],
          color: theme === Theme.Light ? '#CC3887' : '#FF7DC3',
        },
        {
          tag: [
            tags.function(tags.variableName),
            tags.number,
            tags.literal,
            tags.regexp,
          ],
          color: theme === Theme.Light ? '#016ee9' : '#2dc4ff',
        },
        {
          tag: [tags.name, tags.escape, tags.quote, tags.heading],
          color: theme === Theme.Light ? '#007ab8' : '#a5e3ff',
        },
        {
          tag: [tags.string, tags.inserted],
          color: theme === Theme.Light ? '#12824D' : '#35DE7B',
          fontWeight: '600',
        },
        {
          tag: [tags.meta, tags.docString],
          color: theme === Theme.Light ? '#956d00' : '#EDB210',
        },
        {
          tag: [
            tags.propertyName,
            tags.link,
            tags.typeName,
            tags.list,
            tags.atom,
            tags.self,
            tags.deleted,
          ],
          color: theme === Theme.Light ? '#D83713' : '#FF6F44',
        },
        {
          tag: [tags.docComment, tags.className, tags.variableName],
          color: color[theme].text[Variant.Primary][InteractionState.Default],
        },
        {
          tag: tags.comment,
          color: color[theme].text[Variant.Secondary][InteractionState.Default],
          fontStyle: 'italic',
        },
        {
          tag: tags.emphasis,
          fontStyle: 'italic',
        },
        {
          tag: tags.strong,
          fontWeight: fontWeights.bold,
        },
      ]);

      return syntaxHighlighting(highlightStyle);
    },
  });
}
