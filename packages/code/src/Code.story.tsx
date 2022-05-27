/* eslint-disable no-useless-escape */
import React from 'react';
import { Story } from '@storybook/react';
import LGCode, { CodeProps, Language } from '.';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import LanguageSwitcherExample from './LanguageSwitcherExample';

export const Code: React.FC<CodeProps> = props => <LGCode {...props} />;

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

export default {
  title: 'Packages/Code',
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
    onCopy: { control: 'none' },
    showCustomButtons: { control: 'boolean' },
    usePortal: { control: 'boolean' },
    copyable: { control: 'boolean' },
    showWindowChrome: { control: 'boolean' },
    showLineNumbers: { control: 'boolean' },
    darkMode: { control: 'boolean' },
    chromeTitle: { control: 'string' },
    scrollContainer: { control: 'none' },
    portalClassName: { control: 'string' },
    popoverZIndex: { control: 'number' },
    lineNumberStart: { control: 'number' },
  },
  parameters: {
    controls: { exclude: ['children', 'customActionButtons'] },
  },
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
