import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  fontWeights,
  InteractionState,
  Variant,
} from '@leafygreen-ui/tokens';

import { CodeMirrorExtension } from '../CodeEditor.types';

/**
 * The styles applied are meant to approximate the scheme defined for the `Code`
 * component syntax, defined in packages/code/src/globalStyles.tsx
 */

export const createCodeMirrorHighlightStyleExtension = (
  theme: Theme,
): CodeMirrorExtension => {
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
    // Group 9: Functions, Methods, Classes, Literals, etc.
    {
      tag: [
        tags.function(tags.variableName),
        tags.number,
        tags.literal,
        tags.regexp,
      ],
      color: theme === Theme.Light ? '#016ee9' : '#2dc4ff',
    },
    // Group 8: Support, Regex, Escapes, Quotes
    {
      tag: [tags.name, tags.escape, tags.quote, tags.heading],
      color: theme === Theme.Light ? '#007ab8' : '#a5e3ff',
    },
    // Group 7: Strings, Inherited Class, Markup Code, Diff Inserted
    {
      tag: [tags.string, tags.inserted],
      color: theme === Theme.Light ? '#12824D' : '#35DE7B',
      fontWeight: '600',
    },
    // Group 6: Meta, Classes, Search Text
    {
      tag: [tags.meta, tags.docString],
      color: theme === Theme.Light ? '#956d00' : '#EDB210',
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
      color: theme === Theme.Light ? '#D83713' : '#FF6F44',
    },
    // Group 3: Titles, Doctags
    {
      tag: [tags.docComment, tags.className, tags.variableName],
      color: color[theme].text[Variant.Primary][InteractionState.Default],
    },
    // Group 2: Comments
    {
      tag: tags.comment,
      color: color[theme].text[Variant.Secondary][InteractionState.Default],
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

  return syntaxHighlighting(highlightStyle);
};
