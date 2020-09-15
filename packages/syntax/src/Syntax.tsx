import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
// Import from core so we can register the appropriate languages ourselves
import hljs from 'highlight.js/lib/core';
import hljsDefineGraphQL from 'highlightjs-graphql';
import CodeWrapper from './CodeWrapper';
import { Language, SyntaxProps } from './types';
import { SupportedLanguages, languageParsers } from './languages';
import { injectGlobalStyles } from './globalStyles';
import renderingPlugin from './renderingPlugin';

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

function Syntax({
  children,
  language,
  darkMode = false,
  showLineNumbers = false,
  ...rest
}: SyntaxProps) {
  if (!syntaxHighlightingInitialized) {
    initializeSyntaxHighlighting();
  }

  const codeWrapperSharedProps = { language, darkMode, ...rest };

  const highlightedContent = useMemo(() => {
    if (language === Language.None) {
      return null;
    }

    return hljs.highlight(language, children);
  }, [language, children]);

  if (highlightedContent === null) {
    return <CodeWrapper {...codeWrapperSharedProps}>{children}</CodeWrapper>;
  }

  if (showLineNumbers) {
    return (
      <CodeWrapper {...codeWrapperSharedProps}>
        <table
          className={css`
            border-spacing: 0;
          `}
        >
          <tbody>{highlightedContent.reactWithNumbers}</tbody>
        </table>
      </CodeWrapper>
    );
  }

  return (
    <CodeWrapper {...codeWrapperSharedProps}>
      {highlightedContent.react}
    </CodeWrapper>
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
