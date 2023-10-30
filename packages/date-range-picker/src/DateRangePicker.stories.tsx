import React from 'react';
import { StoryFn } from '@storybook/react';

import { DateRangePicker } from '.';

export default {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
};

const Template: StoryFn<typeof DateRangePicker> = props => (
  <DateRangePicker {...props} />
);

export const Basic = Template.bind({});
