import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import flatten from 'lodash/flatten';
import { cx, css } from '@leafygreen-ui/emotion';
import { fontFamilies } from '@leafygreen-ui/tokens';
// Import from core so we can register the appropriate languages ourselves
import hljs from 'highlight.js/lib/core';
import hljsDefineGraphQL from 'highlightjs-graphql';
import { Language, SyntaxProps, Mode } from './types';
import { SupportedLanguages, languageParsers } from './languages';
import { injectGlobalStyles } from './globalStyles';
import renderingPlugin, { TableContent } from './renderingPlugin';
import { SyntaxContext } from './SyntaxContext';

export function expandRangeTuple(
  tuple: [number, number],
): number | Array<number> {
  const [lower, upper] = tuple.sort();

  if (lower === upper) {
    return lower;
  }

  const expandedRange = [];

  for (let i = lower; i <= upper; i++) {
    expandedRange.push(i);
  }

  return expandedRange;
}

export function parseLineHighlightNumbers(
  numbers: Array<number | [number, number]>,
): Array<number> {
  return flatten(
    numbers.map(item => {
      if (item instanceof Array) {
        return expandRangeTuple(item);
      }

      return item;
    }),
  );
}

type FilteredSupportedLanguagesEnum = Omit<
  typeof SupportedLanguages,
  'Cs' | 'JS' | 'TS'
>;
type FilteredSupportedLanguages = FilteredSupportedLanguagesEnum[keyof FilteredSupportedLanguagesEnum];

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
    classPrefix: 'lg-highlight-',
    tabReplace: '  ',
  });

  hljs.addPlugin(renderingPlugin);
}

const codeStyles = css`
  color: inherit;
  font-size: 13px;
  font-family: ${fontFamilies.code};
  line-height: 24px;
`;

function Syntax({
  children,
  language,
  darkMode = false,
  showLineNumbers = false,
  highlightLines = [],
  className,
  ...rest
}: SyntaxProps) {
  if (!syntaxHighlightingInitialized) {
    initializeSyntaxHighlighting();
  }

  const highlightedContent = useMemo(() => {
    if (language === Language.None) {
      return null;
    }

    return hljs.highlight(language, children);
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

  const mode = darkMode ? Mode.Dark : Mode.Light;
  const parsedHighlightLines = parseLineHighlightNumbers(highlightLines);

  return (
    <SyntaxContext.Provider
      value={{
        highlightLines: parsedHighlightLines,
        showLineNumbers,
        darkMode,
      }}
    >
      <code
        {...rest}
        className={cx(
          `lg-highlight-hljs-${mode}`,
          codeStyles,
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
        </table>
      </code>
    </SyntaxContext.Provider>
  );
}

Syntax.displayName = 'Syntax';

Syntax.propTypes = {
  children: PropTypes.string.isRequired,
  lang: PropTypes.oneOf(Object.values(Language)),
  className: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default Syntax;
