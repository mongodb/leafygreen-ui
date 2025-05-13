import React from 'react';
import { StoryFn } from '@storybook/react';

import { CodeEditor } from '.';

export default {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  decorators: [
    Story => (
      <div style={{ width: '100%', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    enableActiveLineHighlighting: true,
    enableClickableUrls: true,
    enableCodeFolding: true,
    enableLineNumbers: true,
    enableLineWrapping: true,
    forceParsing: false,
    placeholder: 'Type your code here...',
    readOnly: false,
    value: 'console.log("Hello, world!");',
  },
  argTypes: {
    enableActiveLineHighlighting: {
      control: { type: 'boolean' },
    },
    enableClickableUrls: {
      control: { type: 'boolean' },
    },
    enableCodeFolding: {
      control: { type: 'boolean' },
    },
    enableLineNumbers: {
      control: { type: 'boolean' },
    },
    enableLineWrapping: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    value: {
      control: { type: 'text' },
    },
  },
};

const Template: StoryFn<typeof CodeEditor> = args => <CodeEditor {...args} />;

export const LiveExample = Template.bind({});
