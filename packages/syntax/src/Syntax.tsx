import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx, css } from '@leafygreen-ui/emotion';
// Import from core so we can register the appropriate languages ourselves
import hljs from 'highlight.js/lib/core';
import hljsDefineGraphQL from 'highlightjs-graphql';
import { Variant, Language } from './types';
import { SupportedLanguages, languageParsers } from './languages';
import { injectGlobalStyles } from './globalStyles';
import renderingPlugin from './renderingPlugin';

type FilteredSupportedLanguagesEnum = Omit<typeof SupportedLanguages, 'Cs'>;
type FilteredSupportedLanguages = FilteredSupportedLanguagesEnum[keyof FilteredSupportedLanguagesEnum];

function filterSupportedLanguages(
  language: SupportedLanguages,
): language is FilteredSupportedLanguages {
  return language !== 'cs';
}

let syntaxHighlightingInitialized = false;

function initializeSyntaxHighlighting() {
  syntaxHighlightingInitialized = true;

  injectGlobalStyles();

  // We filter out 'cs' here because it's redundant with 'csharp'
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

export interface SyntaxProps {
  /**
   * The children to render inside Code. This is usually going to be a formatted code block or line.
   */
  children: string;

  /**
   * An additional CSS class applied to the root element
   */
  className?: string;

  /**
   * The language to highlight the syntax of.
   */
  language: Language;

  /**
   * The variant for the syntax-highlighted block.
   *
   * default: `'light'`
   */
  variant?: Variant;

  /**
   * Shows line numbers. This is specifically used for the Code component implementation.
   *
   * default: `'false'`
   */

  showLineNumbers?: boolean;
}

function Syntax({
  children,
  language,
  className,
  variant = Variant.Light,
  showLineNumbers = false,
  ...rest
}: SyntaxProps & React.HTMLAttributes<HTMLElement>) {
  if (!syntaxHighlightingInitialized) {
    initializeSyntaxHighlighting();
  }

  const codeClassName = cx(
    `lg-highlight-hljs-${variant}`,
    css`
      color: inherit;
      font-size: 13px;
      line-height: 24px;
    `,
    language,
    className,
  );

  if (language === Language.None) {
    return (
      <code {...rest} className={codeClassName}>
        {children}
      </code>
    );
  }

  const highlightedContent = useMemo(() => hljs.highlight(language, children), [
    language,
    children,
  ]);

  if (showLineNumbers) {
    return (
      <code {...rest} className={codeClassName}>
        <table>
          <tbody>{highlightedContent.reactWithNumbers}</tbody>
        </table>
      </code>
    );
  }

  return (
    <code {...rest} className={codeClassName}>
      {highlightedContent.react}
    </code>
  );
}

Syntax.displayName = 'Syntax';

Syntax.propTypes = {
  children: PropTypes.string.isRequired,
  lang: PropTypes.oneOf(Object.values(Language)),
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(Variant)),
};

export default Syntax;
