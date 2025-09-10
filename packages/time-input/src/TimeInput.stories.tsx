import React from 'react';
import { StoryFn } from '@storybook/react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import { TimeInput } from '.';

const meta: StoryMetaType<typeof TimeInput> = {
  title: 'Components/Inputs/TimeInput',
  component: TimeInput,
  parameters: {
    default: 'LiveExample',
  },
};

export default meta;

const Template: StoryFn<typeof TimeInput> = props => <TimeInput {...props} />;

export const LiveExample = Template.bind({});
