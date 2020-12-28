import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Language } from './types';
import Code from '.';

const jsSnippet = `

// If an array of tokens contains an object with more than one children, this function will flatten that tree recursively.
function flattenNestedTree(
  children: Array<string | TokenObject>,
  kind?: string,
): Array<string | FlatTokenObject> {
  if (typeof children === 'string') {
    return children;
  }

  return children.reduce((acc, val) => {
    if (isString(val)) {
      // If there's a kind, we construct a custom token object with that kind to preserve highlighting.
      // Without this, the value will simply render without highlighting.
      const child = kind ? { kind: generateKindClassName(kind), children: [val] } : val;

      return [...acc, child];
    }

    if (val?.children?.length > 1) {
      // Pass the kind here so that the function can highlight nested tokens if applicable
      return [...acc, ...flattenNestedTree(val.children, generateKindClassName(kind, val.kind))];
    }

    if (isFlattenedTokenObject(val)) {
      return [...acc, {kind: generateKindClassName(kind, val.kind), children: val.children}];
    }

    return acc
  }, [] as Array<string | FlatTokenObject>)
}

`;

storiesOf('Code', module).add(
  'Multiline',
  () => {
    const margin = 50;
    const wrapperStyle = css`
      margin: ${margin}px;
      max-width: calc(100% - ${margin * 2}px);
    `;

    return (
      <LeafyGreenProvider>
        <div className={wrapperStyle}>
          <Code
            showLineNumbers={boolean('Show line numbers', false)}
            showWindowChrome={boolean('Show window chrome', false)}
            copyable={boolean('Copyable', true)}
            chromeTitle={text('Chrome label', 'directory/fileName.js')}
            darkMode={boolean('darkMode', false)}
            language={select(
              'Language',
              Object.values(Language),
              Language.TypeScript,
            )}
            highlightLines={select(
              'highlight lines',
              {
                none: undefined,
                single: [1],
                multiple: [2, 3, 5],
              },
              undefined,
            )}
          >
            {text('Code snippet', jsSnippet)}
          </Code>
        </div>
      </LeafyGreenProvider>
    );
  },
  {
    knobs: {
      escapeHTML: false,
    },
  },
);
