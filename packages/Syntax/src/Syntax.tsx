import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx, css } from '@leafygreen-ui/emotion';
import hljs from 'highlight.js/lib/highlight';
import { Variant, SupportedLanguages, Lang } from './types';

const SupportedLanguagesList = Object.values(SupportedLanguages);

let syntaxHighlightingInitialized = false;

function initializeSyntaxHighlighting() {
  syntaxHighlightingInitialized = true;

  require('./globalStyles');

  SupportedLanguagesList.forEach(language => {
    hljs.registerLanguage(
      language,
      require(`highlight.js/lib/languages/${language}`),
    );
  });

  hljs.configure({
    languages: SupportedLanguagesList,
    classPrefix: 'lg-highlight-',
    tabReplace: '  ',
  });
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
   * The language used for syntax highlighting.
   *
   * default: `'auto'`
   */
  lang?: Lang;

  /**
   * The variant for the syntax-highlighted block.
   *
   * default: `'light'`
   */
  variant?: Variant;
}

function Syntax({
  children,
  lang = Lang.Auto,
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
      [lang]: lang !== Lang.Auto,
    },
    className,
  );

  if (lang === Lang.None) {
    return (
      <code {...rest} className={codeClassName}>
        {children}
      </code>
    );
  }

  const highlightedContent: string = useMemo(() => {
    if (lang === Lang.Auto) {
      return hljs.highlightAuto(children).value;
    }

    return hljs.highlight(lang, children).value;
  }, [lang, children]);

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
  lang: PropTypes.oneOf(Object.values(Lang)),
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(Variant)),
};

export default Syntax;
