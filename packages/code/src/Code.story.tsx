/* eslint-disable no-useless-escape */
import React from 'react';
import { Story } from '@storybook/react';
import LGCode, { CodeProps, Language } from '.';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import LanguageSwitcherExample from './LanguageSwitcherExample';

// TODO: Import below comment directly from component definition.
/**
 *
 * React Component that outputs single-line and multi-line code blocks.
 *
 * ---
 * @param props.children The string to be formatted.
 * @param props.className An additional CSS class added to the root element of Code.
 * @param props.language The language used for syntax highlighing.
 * @param props.darkMode Determines if the code block will be rendered in dark mode. Default: `false`
 * @param props.showLineNumbers When true, shows line numbers in preformatted code blocks. Default: `false`
 * @param props.lineNumberStart Specifies the numbering of the first line in the block. Default: 1
 * @param props.copyable When true, allows the code block to be copied to the user's clipboard. Default: `true`
 * @param props.onCopy Callback fired when Code is copied
 */
export const Code: React.FC<CodeProps> = props => <LGCode {...props} />;

const jsSnippet = `

import datetime from './';

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

export default {
  title: 'Components/Code',
  component: Code,
  excludeStories: ['Code'],
  args: {
    language: 'js',
    highlightLines: [],
  },
  argTypes: {
    language: {
      control: {
        type: 'select',
        options: Object.keys(Language),
      },
    },
    usePortal: { control: 'boolean' },
    copyable: { control: 'boolean' },
    showWindowChrome: { control: 'boolean' },
    showLineNumbers: { control: 'boolean' },
    darkMode: { control: 'boolean' },
    chromeTitle: { control: 'text' },
    lineNumberStart: { control: 'number' },
  },
  parameters: {
    controls: {
    exclude : [
      'showCustomActionButtons',
      'showCustomButtons',
      'customActionButtons',
      'children',
      'onCopy',
      'className',
      'onChange',
      'portalClassName',
      'portalContainer',
      'scrollContainer',
      'popoverZIndex',
      'ref'
    ]
  }
  }
};

const Template: Story<CodeProps> = args => <Code {...args}>{jsSnippet}</Code>;

export const Basic = Template.bind({});
Basic.args = {};

export const HighlightOptions = Template.bind({});
HighlightOptions.args = {
  highlightLines: [[2, 4], 6],
};

export const WithChrome = Template.bind({});
WithChrome.args = {
  showWindowChrome: true,
  chromeTitle: 'directory/fileName.js',
};

const customActionButtons = [
  <IconButton onClick={() => {}} aria-label="label" key="1">
    <Icon glyph="Cloud" />
  </IconButton>,
  <Icon glyph="Shell" size={30} key="3" />,
  <IconButton
    href="https://mongodb.design"
    aria-label="label2"
    key="2"
    target="_blank"
  >
    <Icon glyph="Code" size={30} />
  </IconButton>,
];

export const WithCustomActions = Template.bind({});
WithCustomActions.args = {
  showCustomActionButtons: true,
  customActionButtons,
};

export const WithLanguageSwitcher: Story<CodeProps> = args => (
  <LanguageSwitcherExample
    showCustomActionButtons={true}
    customActionButtons={customActionButtons}
    {...args}
  />
);
