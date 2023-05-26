import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { CloseIconColor } from '@leafygreen-ui/modal';

import ConfirmationModal, { ConfirmationModalProps, Variant } from '.';

const meta: StoryMetaType<typeof ConfirmationModal> = {
  title: 'Components/Modals/ConfirmationModal',
  component: ConfirmationModal,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [...storybookExcludedControlParams, 'open', 'initialFocus'],
    },
  },
  args: {
    open: true,
    title: 'Confirm Title Here',
    buttonText: 'Confirm',
    children:
      'This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here. This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here.',
    className: css`
      z-index: 1;
    `,
    closeIconColor: 'default',
    variant: 'primary',
  },
  argTypes: {
    requiredInputText: { control: 'text' },
    open: { control: 'boolean' },
    title: { control: 'text' },
    buttonText: { control: 'text' },
    children: storybookArgTypes.children,
    darkMode: storybookArgTypes.darkMode,
    variant: {
      control: 'select',
      options: Object.values(Variant),
    },
    closeIconColor: {
      control: 'select',
      options: Object.values(CloseIconColor),
    },
  },
};

export default meta;

export const LiveExample: StoryFn<ConfirmationModalProps> = ({
  // eslint-disable-next-line react/prop-types
  darkMode,
  ...args
}) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button darkMode={darkMode} onClick={() => setOpen(!open)}>
        Open Modal
      </Button>
      <ConfirmationModal
        {...args}
        open={open}
        onCancel={handleClose}
        onConfirm={handleClose}
        darkMode={darkMode}
      />
    </>
  );
};

// TODO: Need to update the decorator to handle singletons
// (or update modal to handle custom positioning)
// export const Generated = () => {};
