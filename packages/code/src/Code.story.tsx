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
  return \`Hello, \${entity}! Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.\`;
}
 
console.log(greeting('World'));

`;

storiesOf('Packages/Code', module)
  .add(
    'Multiline',
    () => {
      // Knobs
      const darkMode = boolean('darkMode', false);
      const showLineNumbers = boolean('Show line numbers', false);
      const lineNumberStart = number("First row's line number", 1);
      const showWindowChrome = boolean('Show window chrome', false);
      const showCustomActionButtons = boolean(
        'Show custom action buttons',
        false,
      );
      const copyable = boolean('Copyable', true);
      const chromeTitle = text('Chrome label', 'directory/fileName.js');
      const language = select(
        'Language',
        Object.values(Language),
        Language.JavaScript,
      );
      const highlightLines = select(
        'highlight lines',
        ['none', 'single', 'multiple'],
        'none',
      );
      const baseFontSize = select('Base Font Size', [14, 16], 14);
      const codeSnippet = text('Code snippet', jsSnippet);

      const wrapperStyle = css`
        width: 512px;
      `;

      const lineHighlightOptions = {
        none: [],
        single: [1],
        multiple: [[2, 4], 6],
      } as const;

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
        <LeafyGreenProvider baseFontSize={baseFontSize}>
          <div className={wrapperStyle}>
            <Code
              showLineNumbers={showLineNumbers}
              showWindowChrome={showWindowChrome}
              lineNumberStart={lineNumberStart}
              showCustomActionButtons={showCustomActionButtons}
              customActionButtons={actionData}
              copyable={copyable}
              chromeTitle={chromeTitle}
              darkMode={darkMode}
              language={language}
              highlightLines={lineHighlightOptions[highlightLines]}
            >
              {codeSnippet}
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
        <div
          className={css`
            width: 512px;
          `}
        >
          <LanguageSwitcherExample
            darkMode={darkMode}
            showCustomActionButtons={boolean(
              'Show custom action buttons',
              false,
            )}
            customActionButtons={actionData}
          />
        </div>
      </LeafyGreenProvider>
    );
  });
