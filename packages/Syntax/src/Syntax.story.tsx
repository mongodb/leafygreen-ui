import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import Syntax from '.';
import { Language, Variant } from './types';

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
        variant={select('variant', Object.values(Variant), Variant.Light)}
        language={select('language', Language, Language.Auto)}
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
