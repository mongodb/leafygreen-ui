import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx, css } from '@leafygreen-ui/emotion';
import { fontFamilies, typeScales } from '@leafygreen-ui/tokens';
import { LeafyGreenHighlightResult } from './highlight';
import hljs from 'highlight.js/lib/core'; // Skip highlight's auto-registering
import { HLJSOptions, HLJSPlugin } from 'highlight.js';
import hljsDefineGraphQL from 'highlightjs-graphql';
import { Language, SyntaxProps } from './types';
import { SupportedLanguages, languageParsers } from './languages';
import { injectGlobalStyles } from './globalStyles';
import renderingPlugin, { TableContent } from './renderingPlugin';
import { SyntaxContext } from './SyntaxContext';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { useCodeContext } from './CodeContext';

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

  const { theme, darkMode } = useCodeContext();

  const baseFontSize = useBaseFontSize();
  // TODO: remove 14 check when useBaseFontSize is updated
  const codeSize = baseFontSize === 14 ? '1' : '2';
  const codeFontStyles = css`
    font-size: ${typeScales[`code${codeSize}`].fontSize}px;
    line-height: ${typeScales[`code${codeSize}`].lineHeight}px;
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
            width: 100%;
          `}
        >
          <tbody>{content}</tbody>
        </table>
      </code>
    </SyntaxContext.Provider>
  );
}

Syntax.displayName = 'Syntax';

Syntax.propTypes = {
  children: PropTypes.string.isRequired,
  language: PropTypes.oneOf(Object.values(Language)),
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  showLineNumbers: PropTypes.bool,
  lineNumberStart: PropTypes.number,
  highlightLines: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.number,
    ]),
  ),
};

export default Syntax;
