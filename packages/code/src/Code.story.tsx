/* eslint-disable no-useless-escape */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text, number } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Language } from './types';
import Code from '.';
import LanguageSwitcherExample from './LanguageSwitcherExample';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';

const jsSnippet = `

const myVar = 42;

var myObj = {
  someProp: ['arr', 'ay'],
  regex: /([A-Z])\w+/
}

export default class myClass {
  constructor(){
    // access properties
    this.myProp = false
  }
}

function greeting(entity) {
  return \`Hello, \${entity}!\`;
}
 
console.log(greeting('World'));

`;

storiesOf('Code', module)
  .add(
    'Multiline',
    () => {
      const margin = 50;
      const wrapperStyle = css`
        margin: ${margin}px;
        max-width: calc(100% - ${margin * 2}px);
      `;

      const lineHighlightOptions = {
        none: [],
        single: [1],
        multiple: [[2, 4], 6],
      } as const;

      const darkMode = boolean('darkMode', false);

      const actionData = [
        <IconButton
          onClick={() => {}}
          aria-label="label"
          darkMode={darkMode}
          key="1"
        >
          <Icon glyph="Cloud" />
        </IconButton>,
        <Icon glyph="Shell" size={30} key="3" />,
        <IconButton
          href="https://mongodb.design"
          aria-label="label2"
          darkMode={darkMode}
          key="2"
          target="_blank"
        >
          <Icon glyph="Code" size={30} />
        </IconButton>,
      ];

      return (
        <LeafyGreenProvider>
          <div className={wrapperStyle}>
            <Code
              showLineNumbers={boolean('Show line numbers', false)}
              lineNumberStart={number("First row's line number", 1)}
              showWindowChrome={boolean('Show window chrome', false)}
              showCustomActionButtons={boolean(
                'Show custom action buttons',
                false,
              )}
              customActionButtons={actionData}
              copyable={boolean('Copyable', true)}
              chromeTitle={text('Chrome label', 'directory/fileName.js')}
              darkMode={darkMode}
              language={select(
                'Language',
                Object.values(Language),
                Language.JavaScript,
              )}
              highlightLines={
                lineHighlightOptions[
                  select(
                    'highlight lines',
                    ['none', 'single', 'multiple'],
                    'none',
                  )
                ]
              }
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
  )
  .add('LanguageSwitcher', () => {
    const darkMode = boolean('darkMode', false);

    const actionData = [
      <IconButton
        onClick={() => {}}
        aria-label="label"
        darkMode={darkMode}
        key="1"
      >
        <Icon glyph="Cloud" />
      </IconButton>,
      <Icon glyph="Shell" size={30} key="3" />,
      <IconButton
        href="https://mongodb.design"
        aria-label="label2"
        darkMode={darkMode}
        key="2"
        target="_blank"
      >
        <Icon glyph="Code" size={30} />
      </IconButton>,
    ];

    return (
      <LeafyGreenProvider>
        <LanguageSwitcherExample
          darkMode={darkMode}
          showCustomActionButtons={boolean('Show custom action buttons', false)}
          customActionButtons={actionData}
        />
      </LeafyGreenProvider>
    );
  });
