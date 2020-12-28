import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { Language } from './types';
import Code from '.';

const jsSnippet = `
export function treeToLines(
  children: Array<string | TokenObject>,
): Array<Array<TreeItem>> {
  const lines: Array<Array<TreeItem>> = [];
  let currentLineIndex = 0;

  return lines;
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
    );
  },
  {
    knobs: {
      escapeHTML: false,
    },
  },
);
