import React from 'react';
import PropTypes from 'prop-types';
import { emotion } from '@leafygreen-ui/lib';
import hljs from 'highlight.js/lib/highlight';
import SyntaxTheme from './SyntaxTheme';
import { Variants, SupportedLanguages } from './types';

const { cx } = emotion;

Object.keys(SupportedLanguages).forEach(language => {
  hljs.registerLanguage(
    language,
    require(`highlight.js/lib/languages/${language}`),
  );
});

hljs.configure({
  languages: Object.keys(SupportedLanguages),
  classPrefix: 'lg-highlight-',
  tabReplace: '  ',
});

export interface Props {
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
  lang: SupportedLanguages | 'auto' | 'none';

  /**
   * The variant for the syntax-highlighted block.
   *
   * default: `'light'`
   */
  variant: Variants;
}

function Syntax({
  children,
  lang,
  className,
  variant = Variants.Light,
}: Props): React.ReactElement {
  const highlightedContent = {
    __html: (() => {
      if (!children) {
        return '';
      }

      if (lang === 'none') {
        return children;
      }

      if (lang === 'auto') {
        return hljs.highlightAuto(children).value;
      }

      return hljs.highlight(lang, children).value;
    })(),
  };

  return (
    <>
      <code
        className={cx(
          'lg-highlight-hljs',
          {
            [SupportedLanguages[lang]]: lang !== 'auto',
          },
          className,
        )}
        dangerouslySetInnerHTML={highlightedContent}
      />

      <SyntaxTheme variant={variant} />
    </>
  );
}

Syntax.displayName = 'Syntax';

Syntax.propTypes = {
  children: PropTypes.string,
  lang: PropTypes.oneOf([...Object.keys(SupportedLanguages), 'auto', 'none']),
  className: PropTypes.string,
};

Syntax.defaultProps = {
  lang: 'auto',
  variant: Variants.Light,
};

export default Syntax;
