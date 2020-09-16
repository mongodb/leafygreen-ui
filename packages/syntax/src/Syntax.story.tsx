import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import Syntax from '.';
import { Language } from './types';

const jsSnippet = `
function greeting(entity) {
  return \`Hello, \${entity}!\`;
}

console.log(greeting('World'));
`;

const margin = 50;

storiesOf('Syntax', module).add(
  'Syntax',
  () => (
    <div
      className={css`
        margin: ${margin}px;
        max-width: calc(100% - ${margin * 2}px);
      `}
    >
      <Syntax
        showLineNumbers={boolean('Show line numbers', false)}
        darkMode={boolean('darkMode', false)}
        language={select('language', Language, Language.JavaScript)}
      >
        {text('Code snippet', jsSnippet)}
      </Syntax>
    </div>
  ),
  {
    knobs: {
      escapeHTML: false,
    },
  },
);
