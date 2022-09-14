import React from 'react';
import { ComponentStory } from '@storybook/react';
import defaultArgTypes from '../../../stories/defaultArgTypes';
import Toast, { Variant } from '.';
import { Link } from '@leafygreen-ui/typography';

export default {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    controls: {
      exclude: ['close', 'className'],
    },
  },
  args: {
    title: 'Velit ea exercitation qui aute dolor proident.',
    body: 'Exercitation incididunt ea proident velit mollit',
    open: true,
    variant: Variant.Note,
    darkMode: false,
  },
  argTypes: {
    className: {
      control: 'text',
    },
    progress: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      if: { arg: 'variant', eq: Variant.Progress },
    },
    open: {
      control: 'boolean',
    },
    darkMode: defaultArgTypes.darkMode,
    body: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
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

export const WithLink = Template.bind({});
WithLink.args = {
  body: (
    <>
      Exercitation incididunt ea proident. &nbsp;
      <Link href="http://localhost:9001">Link style</Link>
    </>
  ),
};
