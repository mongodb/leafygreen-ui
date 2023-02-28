import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { StoryMeta } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import { Variant } from '../Toast.types';

import { InternalToast } from '.';

export default StoryMeta<typeof InternalToast>({
  title: 'Components/Toast/Internal',
  component: InternalToast,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: ['open', 'onClose'],
    },
  },
  args: {
    title: 'Velit ea exercitation qui aute dolor proident.',
    description: 'Exercitation incididunt ea proident velit mollit',
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
    description: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
  },
});

export const Basic: ComponentStory<typeof InternalToast> = args => {
  const [open, setOpen] = useState(true);
  const { darkMode } = args;

  return (
    <>
      <Button darkMode={darkMode} onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Open'} Toast
      </Button>
      <InternalToast {...args} />
    </>
  );
};

export const Dismissible: ComponentStory<typeof InternalToast> = args => {
  const [open, setOpen] = useState(true);
  const { darkMode } = args;

  return (
    <>
      <Button darkMode={darkMode} onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Open'} Toast
      </Button>
      <InternalToast {...args} onClose={() => setOpen(false)} />
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
