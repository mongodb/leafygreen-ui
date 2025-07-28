import { type EditorView } from '@codemirror/view';

import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  fontWeights,
  InteractionState,
  Variant,
} from '@leafygreen-ui/tokens';

import { type CodeEditorModules } from '../useModuleLoaders';

import { useExtension } from './useExtension';
import { type LanguageName } from './useLanguageExtension';

/**
 * Hook that provides syntax highlighting functionality for CodeMirror editors.
 * This hook creates and manages a CodeMirror extension for syntax highlighting
 * with theme integration and language-specific highlighting.
 *
 * @param params Configuration object for the highlight extension
 * @param params.editorView The CodeMirror EditorView instance to attach the extension to
 * @param params.stateModule CodeMirror state module (`@codemirror/state`) for creating the compartment (marked optional for lazy loading, but required for functionality)
 * @param params.theme The LeafyGreen theme to apply for syntax highlighting
 * @param params.language Language identifier for language-specific highlighting (marked optional for lazy loading, but required for functionality)
 * @param params.modules Various CodeMirror language modules needed for syntax highlighting (marked optional for lazy loading, but required for functionality)
 * @returns A CodeMirror extension that enables syntax highlighting based on the provided theme and language
 *
 * @remarks
 * Note: Although several parameters are marked as optional in the type signature (due to lazy loading),
 * the extension will only be fully functional once all required modules are provided. The hook safely handles
 * the case where modules aren't immediately available by returning an empty extension array.
 * This pattern allows the component to render immediately while modules are being loaded asynchronously.
 */
export function useHighlightExtension({
  editorView,
  stateModule,
  theme,
  language,
  modules,
}: {
  editorView: EditorView | null;
  stateModule?: typeof import('@codemirror/state');
  theme: Theme;
  language?: LanguageName;
  modules?: Partial<CodeEditorModules>;
}) {
  return useExtension({
    editorView,
    stateModule,
    value: {
      theme,
      language,
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
