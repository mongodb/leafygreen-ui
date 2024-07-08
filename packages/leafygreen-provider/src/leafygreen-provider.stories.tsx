import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '.';

const TestComponent = () => <div>This is a test component.</div>;

const meta: StoryMetaType<typeof LeafyGreenProvider> = {
  title: 'Contexts/LeafyGreenProvider',
  component: LeafyGreenProvider,
  parameters: {
    default: null,
  },
  argTypes: {
    darkMode: { control: 'boolean' },
    popoverPortalContainer: { control: 'none' },
  },
};
export default meta;

// eslint-disable-next-line react/prop-types
const Template: StoryFn<typeof LeafyGreenProvider> = props => (
  <LeafyGreenProvider {...props}>
    <TestComponent />
  </LeafyGreenProvider>
);

export const Basic = Template.bind({});
Basic.parameters = {
  chromatic: { disableSnapshot: true },
};
