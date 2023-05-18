/* eslint-disable no-useless-escape */
import React from 'react';
import { StoryFn } from '@storybook/react';

import Code, { CodeProps, Language } from '@leafygreen-ui/code';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import {
  storybookArgTypes,
  storybookExcludedControlParams as defaultExclude,
  type StoryMetaType,
} from '@leafygreen-ui/lib';

import LanguageSwitcherExample from './LanguageSwitcher/LanguageSwitcherExample';

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

const meta: StoryMetaType<typeof Code> = {
  title: 'Components/Code',
  component: Code,
  args: {
    language: 'js',
    highlightLines: [],
    baseFontSize: 14,
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
    darkMode: storybookArgTypes.darkMode,
    chromeTitle: { control: 'text' },
    lineNumberStart: { control: 'number' },
    baseFontSize: storybookArgTypes.baseFontSize,
  },
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [
        ...defaultExclude,
        'showCustomActionButtons',
        'showCustomButtons',
        'customActionButtons',
        'languageOptions',
      ],
    },
  },
};

export default meta;

type BaseFontSize = 14 | 16;

const Template: StoryFn<CodeProps & { baseFontSize: BaseFontSize }> = ({
  // eslint-disable-next-line react/prop-types
  baseFontSize,
  ...args
}) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <Code {...(args as CodeProps)}>{jsSnippet}</Code>
  </LeafygreenProvider>
);

export const Basic = Template.bind({});
Basic.args = {};

export const HighlightOptions = Template.bind({});
HighlightOptions.args = {
  highlightLines: [6, [10, 15]],
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

export const WithLanguageSwitcher: StoryFn<
  CodeProps & { baseFontSize: BaseFontSize }
  // eslint-disable-next-line react/prop-types
> = ({ baseFontSize, ...args }) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <LanguageSwitcherExample
      showCustomActionButtons={true}
      customActionButtons={customActionButtons}
      {...args}
    />
  </LeafygreenProvider>
);
