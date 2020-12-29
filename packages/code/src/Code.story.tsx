import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Language } from './types';
import Code from '.';

const jsSnippet = `

try {
  db.products.insertOne(
    { "item": "envelopes", "qty": 100, "type": "Self-Sealing" },
    { writeConcern: { w: "majority", wtimeout: 100 } }
  );
} catch(e) {
  print(e);
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
              Language.JavaScript,
            )}
            highlightLines={select(
              'highlight lines',
              {
                none: [],
                single: [1],
                // @ts-expect-error
                // Knobs typing seems to be off – it says that this isn't assignable to a string.
                multiple: [[2, 4], 6],
              },
              [],
            ) as Array<number | [number, number]>}
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
