import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { StoryMeta } from '@leafygreen-ui/lib';

import { ToastProvider, Variant } from '..';

import { ControlledToast as Toast } from './ControlledToast';

export default StoryMeta({
  title: 'Components/Toast/Controlled',
  component: Toast,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: ['open', 'onClose'],
    },
  },
  args: {
    title: 'Velit ea exercitation qui aute dolor proident.',
    description: 'Exercitation incididunt ea proident velit mollit',
    open: true,
    variant: Variant.Note,
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

export const Basic: ComponentStory<typeof Toast> = args => {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Open'} Toast
      </Button>
      <Toast
        {...args}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </ToastProvider>
  );
};
