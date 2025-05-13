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
};

const Template: StoryFn<typeof CodeEditor> = () => <CodeEditor />;

export const Basic = Template.bind({});
