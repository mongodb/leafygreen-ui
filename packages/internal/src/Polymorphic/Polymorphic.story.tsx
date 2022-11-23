import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Polymorphic } from '.';

export default {
  title: 'Components/Internal/Polymorphic',
  component: Polymorphic,
};

const Template: ComponentStory<typeof Polymorphic> = props => (
  <Polymorphic {...props} />
);

export const Basic = Template.bind({});
