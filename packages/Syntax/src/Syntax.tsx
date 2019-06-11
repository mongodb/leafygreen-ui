import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { emotion } from '@leafygreen-ui/lib';
import hljs from 'highlight.js/lib/highlight';
import variantStyles from './globalStyles';
import { Variants, SupportedLanguages } from './types';

const { cx, injectGlobal } = emotion;

variantStyles.forEach(style => injectGlobal(style))

const SupportedLanguagesList = Object.values(SupportedLanguages)

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
  variant: typeof Variants[keyof typeof Variants];
  
}

function Syntax({
  children,
  lang = 'auto',
  className,
  variant = 'light',
}: Props): React.ReactElement {
  const codeClassName = cx(
    `lg-highlight-hljs-${variant}`,
    'lg-highlight-hljs',
    {
      [SupportedLanguages[lang]]: lang !== 'auto',
    },
    className,
  );

  if (!children) {
    return <code className={codeClassName} />;
  }

  if (lang === 'none') {
    return <code className={codeClassName}>{children}</code>;
  }

  const highlightedContent: string = useMemo(() => {
    if (lang === 'auto') {
      return hljs.highlightAuto(children).value;
    }

    return hljs.highlight(lang, children).value;
  }, [lang, children]);

  return (
    <>
      <code
        className={codeClassName}
        dangerouslySetInnerHTML={{ __html: highlightedContent }}
      />
    </>
  );
}

Syntax.displayName = 'Syntax';

Syntax.propTypes = {
  children: PropTypes.string,
  lang: PropTypes.oneOf([...SupportedLanguagesList, 'auto', 'none']),
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(Variants))
};

export default Syntax;
