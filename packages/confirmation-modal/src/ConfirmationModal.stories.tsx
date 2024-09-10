import React, { useState } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { CloseIconColor } from '@leafygreen-ui/modal';

import ConfirmationModal, { ConfirmationModalProps, Variant } from '.';

const meta: StoryMetaType<typeof ConfirmationModal> = {
  title: 'Components/Modals/ConfirmationModal',
  component: ConfirmationModal,
  parameters: {
    default: 'LiveExample',
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
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button darkMode={darkMode} onClick={() => setOpen(!open)}>
        Open Modal
      </Button>
      <ConfirmationModal
        {...args}
        open={open}
        confirmButtonProps={{
          onClick: handleClose,
        }}
        cancelButtonProps={{
          onClick: handleClose,
        }}
        darkMode={darkMode}
      />
    </div>
  );
};
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Basic: StoryFn<ConfirmationModalProps> = ({
  // eslint-disable-next-line react/prop-types
  darkMode,
  ...args
}) => {
  return (
    <div
      className={css`
        height: 100vh;
      `}
    >
      <ConfirmationModal {...args} open={true} darkMode={darkMode} />;
    </div>
  );
};

export const DarkMode = Basic.bind({});
DarkMode.args = {
  darkMode: true,
};
