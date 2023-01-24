import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import LeafyGreenProvider from '.';

const TestComponent = () => <div>This is a test component.</div>;

export default {
  title: 'Contexts/LeafyGreenProvider',
  component: LeafyGreenProvider,
  excludeStories: ['TestComponent'],
  parameters: {
    controls: {
      exclude: ['className'],
    },
  },
  argTypes: {
    darkMode: { control: 'boolean' },
    popoverPortalContainer: { control: 'none' },
  },
} as Meta<typeof LeafyGreenProvider>;

// eslint-disable-next-line react/prop-types
const Template: ComponentStory<typeof LeafyGreenProvider> = props => (
  <LeafyGreenProvider {...props}>
    <TestComponent />
  </LeafyGreenProvider>
);

export const Basic = Template.bind({});
