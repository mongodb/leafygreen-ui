import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { StoryMeta } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import Toast, { Variant } from '.';

export default StoryMeta({
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: ['open', 'onClose', 'className', 'as'],
    },
  },
  args: {
    title: 'This is a toast title',
    description: 'This is a toast description',
    open: true,
    variant: Variant.Note,
    darkMode: false,
    progress: 0,
    className: css`
      z-index: 1;
    `,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(Variant),
      default: Variant.Note,
    },
    progress: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      if: { arg: 'variant', eq: Variant.Progress },
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    dismissible: {
      control: 'boolean',
    },
  },
});

export const Basic: ComponentStory<typeof Toast> = args => {
  const [open, setOpen] = useState(true);
  const { darkMode } = args;

  return (
    <>
      <Button darkMode={darkMode} onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Open'} Toast
      </Button>
      <Toast {...args} open={open} />
    </>
  );
};

export const Dismissible: ComponentStory<typeof Toast> = args => {
  const [open, setOpen] = useState(true);
  const { darkMode } = args;

  return (
    <>
      <Button darkMode={darkMode} onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Open'} Toast
      </Button>
      <Toast {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const WithLink = Basic.bind({});
WithLink.args = {
  description: (
    <>
      Exercitation incididunt ea proident. &nbsp;
      <Link href="http://localhost:9001">Link style</Link>
    </>
  ),
};
