import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import Toast, { Variant } from '.';

export default {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    controls: {
      exclude: ['open', 'close', 'className'],
    },
  },
  args: {
    title: 'Velit ea exercitation qui aute dolor proident.',
    body: 'Exercitation incididunt ea proident velit mollit',
    open: true,
    variant: Variant.Note,
    darkMode: false,
    progress: 0,
    className: css`
      z-index: 1;
    `,
  },
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      if: { arg: 'variant', eq: Variant.Progress },
    },
    darkMode: storybookArgTypes.darkMode,
    body: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
  },
};

export const Basic: ComponentStory<typeof Toast> = args => {
  const [open, setOpen] = useState(false);
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
  const [open, setOpen] = useState(false);
  const { darkMode } = args;

  return (
    <>
      <Button darkMode={darkMode} onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Open'} Toast
      </Button>
      <Toast {...args} open={open} close={() => setOpen(false)} />
    </>
  );
};

export const WithLink = Basic.bind({});
WithLink.args = {
  body: (
    <>
      Exercitation incididunt ea proident. &nbsp;
      <Link href="http://localhost:9001">Link style</Link>
    </>
  ),
};
