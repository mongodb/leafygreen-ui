import React from 'react';
import { ComponentStory } from '@storybook/react';
import defaultArgTypes from '../../../stories/defaultArgTypes';
import Toast, { Variant } from '.';

export default {
  title: 'Components/Toast',
  component: Toast,
  args: {
    title: 'Velit ea exercitation qui aute dolor proident.',
    body: 'Exercitation incididunt ea proident velit mollit',
    open: true,
    variant: Variant.Note,
    darkMode: false,
  },
  argTypes: {
    className: {
      control: 'string',
    },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    open: {
      control: 'boolean',
    },
    darkMode: defaultArgTypes.darkMode,
  },
};

const Template: ComponentStory<typeof Toast> = args => <Toast {...args} />;

export const Basic = Template.bind({});

export const Dismissible = Template.bind({});
Dismissible.args = {
  close: () => {
    // eslint-disable-next-line no-console
    console.log('close');
  },
};
