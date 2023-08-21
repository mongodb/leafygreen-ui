import React from 'react';
import { StoryFn } from '@storybook/react';

import { DatePicker } from '.';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
};

const Template: StoryFn<typeof DatePicker> = props => <DatePicker {...props} />;

export const Basic = Template.bind({});
