import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { Language } from '@leafygreen-ui/syntax';
import Code from '.';

const jsSnippet = `
function greeting(entity) {
  return \`Hello, \${entity}!\`;
}

console.log(greeting('World'));
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
            Language.JavaScript,
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
