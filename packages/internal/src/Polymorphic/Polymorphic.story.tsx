import React from 'react';
import { ComponentStory } from '@storybook/react';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { Polymorphic } from '.';

export default {
  title: 'Components/Internal/Polymorphic',
  component: Polymorphic,
  args: {
    children: 'Polymorphic',
    as: 'button',
    href: 'mongodb.design',
  },
  argTypes: {
    as: storybookArgTypes.as,
    children: storybookArgTypes.children,
    href: {
      control: 'text',
      if: { arg: 'as', eq: 'a' },
    },
  },
  parameters: {
    controls: {
      exclude: ['className'],
    },
  },
};

export const Basic: ComponentStory<typeof Polymorphic> = props => (
  <Polymorphic {...props} />
);
