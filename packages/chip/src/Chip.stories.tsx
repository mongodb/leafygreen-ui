import React from 'react';
import { StoryFn } from '@storybook/react';

import { Chip } from '.';

export default {
  title: 'Components/Chip',
  component: Chip,
};

const Template: StoryFn<typeof Chip> = props => {
  return (
    <>
      <Chip {...props} label="meow meow meow meow meow" />
      <Chip {...props} label="hi " />
      <Chip {...props} onDismiss={() => {}} label="meow meow meow meow meow" />
      <Chip {...props} onDismiss={() => {}} label="hi " />
    </>
  );
};

export const Basic = Template.bind({});
