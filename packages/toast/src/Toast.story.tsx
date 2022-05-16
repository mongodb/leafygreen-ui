import React from 'react';
import { ComponentStory } from '@storybook/react';
import Toast, { Variant } from '.';

export default {
  title: 'Packages/Toast',
  component: Toast,
  args: {
    title: 'Velit ea exercitation qui aute dolor proident.',
    body: 'Exercitation incididunt ea proident velit mollit',
    open: true,
    variant: Variant.Note,
  },
  argTypes: {
    className: {
      control: 'string',
    },
    progress: {
      control: 'range',
      min: 0,
      max: 1,
      step: 0.01,
      initialValue: 0,
    },
    open: {
      control: 'boolean',
    },
  },
};

const Template: ComponentStory<typeof Toast> = args => <Toast {...args} />;

export const Basic = Template.bind({});
