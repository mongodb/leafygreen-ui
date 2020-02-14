import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx, css } from '@leafygreen-ui/emotion';
import hljs from 'highlight.js/lib/highlight';
import { Variant, SupportedLanguages, Language } from './types';
import { injectGlobalStyles } from './globalStyles';
import * as languages from './languages';

let syntaxHighlightingInitialized = false;

function initializeSyntaxHighlighting() {
  syntaxHighlightingInitialized = true;

  injectGlobalStyles();

  const SupportedLanguagesList = Object.values(SupportedLanguages);

  SupportedLanguagesList.forEach(language => {
    hljs.registerLanguage(language, languages[language]);
  });

  hljs.configure({
    languages: SupportedLanguagesList,
    classPrefix: 'lg-highlight-',
    tabReplace: '  ',
  });
}

export const SyntaxProps = {};
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
   * The language used for syntax highlighting.
   *
   * default: `'auto'`
   */
  language?: Language;

  /**
   * The variant for the syntax-highlighted block.
   *
   * default: `'light'`
   */
  variant?: Variant;
}

function Syntax({
  children,
  language = Language.Auto,
  className,
  variant = Variant.Light,
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
    {
      [language]: language !== Language.Auto,
    },
    className,
  );

  if (language === Language.None) {
    return (
      <code {...rest} className={codeClassName}>
        {children}
      </code>
    );
  }

  const highlightedContent: string = useMemo(() => {
    if (language === Language.Auto) {
      return hljs.highlightAuto(children).value;
    }

    return hljs.highlight(language, children).value;
  }, [language, children]);

  // We use dangerouslySetInnerHTML here because the other Highlight.js API mutates the DOM
  // after rendering, and limits the flexibility to explicitly specify a language.
  return (
    <code
      {...rest}
      className={codeClassName}
      dangerouslySetInnerHTML={{ __html: highlightedContent }}
    />
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
