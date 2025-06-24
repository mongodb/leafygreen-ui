// leafygreen-codemirror-theme.ts
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { EditorView } from '@uiw/react-codemirror';

import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  Variant,
} from '@leafygreen-ui/tokens';

import { CodeEditorSelectors, CodeMirrorExtension } from '../CodeEditor.types';

/**
 * The styles applied are meant to approximate the scheme defined for the `Code`
 * component syntax, defined in packages/code/src/globalStyles.tsx
 */

interface EditorPalette {
  0: string; // Background
  1: string; // Borders / non-text graphical accents
  2: string; // Comments, Doctags, Formulas, Line Numbers
  3: string; // Default Text, variable names
  5: string; // Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
  6: string; // Classes, Markup Bold, Search Text Background
  7: string; // Strings, Inherited Class, Markup Code, Diff Inserted
  8: string; // Support, Regular Expressions, Escape Characters, Markup Quotes
  9: string; // Functions, Methods, Classes, Names, Sections, Literals
  10: string; // Keywords, Storage, Selector, Markup Italic, Diff Changed
}

function getPalette(theme: Theme): EditorPalette {
  const lightColors = {
    0: color[theme].background[Variant.Primary][InteractionState.Default],
    1: color[theme].border[Variant.Secondary][InteractionState.Default],
    2: color[theme].text[Variant.Secondary][InteractionState.Default],
    3: color[theme].text[Variant.Primary][InteractionState.Default],
    5: '#D83713',
    6: '#956d00',
    7: '#12824D',
    8: '#007ab8',
    9: '#016ee9',
    10: '#CC3887',
  };

  if (theme === Theme.Dark) {
    return {
      ...lightColors,
      5: '#FF6F44',
      6: '#EDB210',
      7: '#35DE7B',
      8: '#a5e3ff',
      9: '#2dc4ff',
      10: '#FF7DC3',
    };
  }

  return lightColors;
}

export const createCodeMirrorTheme = (
  theme: Theme,
  fontSize: number,
): CodeMirrorExtension => {
  const colors = getPalette(theme);

  const editorTheme = EditorView.theme(
    {
      '&': {
        color: colors[3],
        backgroundColor: colors[0],
        border: 'none',
      },
      [`&${CodeEditorSelectors.Focused}`]: {
        outline: 'none',
      },
      [CodeEditorSelectors.Content]: {
        caretColor: colors[9],
        fontFamily: fontFamilies.code,
        fontSize: `${fontSize}px`,
      },
      [`&${CodeEditorSelectors.Focused} ${CodeEditorSelectors.Cursor}`]: {
        borderLeftColor: colors[9],
      },
      [CodeEditorSelectors.Gutters]: {
        backgroundColor: colors[0],
        color: colors[2],
        border: 'none',
        borderTopLeftRadius: `${borderRadius[300]}px`,
        borderBottomLeftRadius: `${borderRadius[300]}px`,
        fontFamily: fontFamilies.code,
        fontSize: `${fontSize}px`,
      },
      [`${CodeEditorSelectors.LineNumbers} ${CodeEditorSelectors.GutterElement}`]:
        {
          width: '48px',
        },
      [CodeEditorSelectors.Line]: {
        paddingLeft: '12px',
      },
    },
    { dark: theme === Theme.Dark },
  );

  const highlightStyle = HighlightStyle.define([
    // Group 10: Keywords, Storage, Selector, etc.
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
      color: colors[10],
    },
    // Group 9: Functions, Methods, Classes, Literals, etc.
    {
      tag: [
        tags.function(tags.variableName),
        tags.number,
        tags.literal,
        tags.regexp,
      ],
      color: colors[9],
    },
    // Group 8: Support, Regex, Escapes, Quotes
    {
      tag: [tags.name, tags.escape, tags.quote, tags.heading],
      color: colors[8],
    },
    // Group 7: Strings, Inherited Class, Markup Code, Diff Inserted
    {
      tag: [tags.string, tags.inserted],
      color: colors[7],
      fontWeight: '600',
    },
    // Group 6: Meta, Classes, Search Text
    {
      tag: [tags.meta, tags.docString],
      color: colors[6],
    },
    // Group 5: Variables, XML Tags, Diff Deleted, etc.
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
      color: colors[5],
    },
    // Group 3: Titles, Doctags
    {
      tag: [tags.docComment, tags.className, tags.variableName],
      color: colors[3],
    },
    // Group 2: Comments
    {
      tag: tags.comment,
      color: colors[2],
      fontStyle: 'italic',
    },
    // Misc Styles
    {
      tag: tags.emphasis,
      fontStyle: 'italic',
    },
    {
      tag: tags.strong,
      fontWeight: fontWeights.bold,
    },
  ]);

  return [editorTheme, syntaxHighlighting(highlightStyle)];
};
