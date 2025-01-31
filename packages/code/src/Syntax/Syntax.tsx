import React, { useMemo } from 'react';
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

      // const kwds = ['shaneeza'];

      // hljs.getLanguage(language).keywords.custom = ['testing'];
      // const built_in = hljs.getLanguage(language);
      // console.log({ language, built_in });

      // hljs.getLanguage(language).keywords.built_in = [
      //   ...new Set([...built_in, ...kwds]),
      // ];
    }
  });

  hljs.configure({
    languages: SupportedLanguagesList,
    tabReplace: '  ',
  } as Partial<HLJSOptions>);

  hljs.addPlugin(renderingPlugin as HLJSPlugin);

  // hljs.addPlugin({
  //   'before:highlight': results => {
  //     console.log('🍓🍓🍓', { code: results.code });
  //     results.code = results.code.replace(
  //       /datetime/g,
  //       '<div class="highlighted">datetime</div>',
  //     );
  //   },
  // });

  // in after:highlight, the code is already a react component so I don't think I can modify it
  // hljs.addPlugin({
  //   'after:highlight': results => {
  //     console.log('🍓🍓🍓', { results });
  //   },
  // });
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
        </table>
      </code>
    </SyntaxContext.Provider>
  );
}

Syntax.displayName = 'Syntax';

export default Syntax;

export { hljs };
