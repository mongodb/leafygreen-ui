import React, { useMemo } from 'react';
// import { renderToString } from 'react-dom/server';
import { HLJSOptions, HLJSPlugin } from 'highlight.js';
import hljs from 'highlight.js/lib/core'; // Skip highlight's auto-registering
import hljsDefineGraphQL from 'highlightjs-graphql';

import { css, cx } from '@leafygreen-ui/emotion';
import {
  useBaseFontSize,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { fontFamilies, typeScales } from '@leafygreen-ui/tokens';

import { injectGlobalStyles } from '../globalStyles';
import { LeafyGreenHighlightResult } from '../highlight';
import { languageParsers, SupportedLanguages } from '../languages';
import renderingPlugin, {
  TableContent,
} from '../renderingPlugin/renderingPlugin';
import { SyntaxContext } from '../Syntax/SyntaxContext';
import { Language } from '../types';
import { SyntaxProps } from '..';

type FilteredSupportedLanguagesEnum = Omit<
  typeof SupportedLanguages,
  // Aliases for languages
  'Cs' | 'JS' | 'TS'
>;
type FilteredSupportedLanguages =
  FilteredSupportedLanguagesEnum[keyof FilteredSupportedLanguagesEnum];

function filterSupportedLanguages(
  language: SupportedLanguages,
): language is FilteredSupportedLanguages {
  return language !== 'cs' && language !== 'js' && language !== 'ts';
}

let syntaxHighlightingInitialized = false;

function initializeSyntaxHighlighting() {
  syntaxHighlightingInitialized = true;

  injectGlobalStyles();

  // We filter out 'cs' here because it's redundant with 'csharp' and 'js' because it's redundant with 'javascript'
  const SupportedLanguagesList = Object.values(SupportedLanguages).filter(
    filterSupportedLanguages,
  );

  SupportedLanguagesList.forEach(language => {
    if (language === 'graphql') {
      hljsDefineGraphQL(hljs);
    } else {
      hljs.registerLanguage(language, languageParsers[language]);
    }
  });

  hljs.configure({
    languages: SupportedLanguagesList,
    tabReplace: '  ',
  } as Partial<HLJSOptions>);

  hljs.addPlugin(renderingPlugin as HLJSPlugin);
}

const codeStyles = css`
  color: inherit;
  font-family: ${fontFamilies.code};
`;

/**
 * @internal
 */
function Syntax({
  children,
  language,
  showLineNumbers = false,
  lineNumberStart,
  highlightLines = [],
  className,
  ...rest
}: SyntaxProps) {
  if (!syntaxHighlightingInitialized) {
    initializeSyntaxHighlighting();
  }

  const highlightedContent: LeafyGreenHighlightResult | null = useMemo(() => {
    if (language === Language.None) {
      return null;
    }

    return hljs.highlight(children, {
      language,
      ignoreIllegals: true,
    }) as LeafyGreenHighlightResult;
  }, [language, children]);

  const content =
    highlightedContent === null ? (
      // We create a similar data structure to the rendering plugin so that we can generate
      // a table that's identical when the plugin isn't being used.
      <TableContent
        lines={children.split('\n').map(item => (item ? [item] : []))}
      />
    ) : (
      highlightedContent.react
    );

  /**
   * This is a workaround to add a custom class to any word wrapped in a underscore. E.g. _highlight_
   */
  // const updatedStringWithCustomClass = renderToString(
  //   content as ReactElement,
  // ).replace(
  //   /_(\w+)_/g,
  //   (_, word) => `<span class="lg-highlight-custom">${word}</span>`,
  // );

  // console.log({ beforeString: renderToString(content), updatedStringWithCustomClass });

  const { theme, darkMode } = useDarkMode();

  const baseFontSize = useBaseFontSize();
  // TODO: remove 14 check when useBaseFontSize is updated
  const typeScale = baseFontSize === 14 ? typeScales.code1 : typeScales.code2;
  const codeFontStyles = css`
    font-size: ${typeScale.fontSize}px;
    line-height: ${typeScale.lineHeight}px;
  `;

  return (
    <SyntaxContext.Provider
      value={{
        highlightLines,
        showLineNumbers,
        lineNumberStart,
        darkMode,
      }}
    >
      <code
        {...rest}
        className={cx(
          `lg-highlight-hljs-${theme}`,
          codeStyles,
          codeFontStyles,
          language,
          className,
        )}
      >
        <table
          className={css`
            border-spacing: 0;
          `}
        >
          <tbody>{content}</tbody>
          {/* <tbody
            dangerouslySetInnerHTML={{ __html: updatedStringWithCustomClass }}
          /> */}
        </table>
      </code>
    </SyntaxContext.Provider>
  );
}

Syntax.displayName = 'Syntax';

export default Syntax;
