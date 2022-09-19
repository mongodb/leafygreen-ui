import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import Button from '@leafygreen-ui/button';
import ConfirmationModal, { Variant } from '.';
import { storybookArgTypes } from '@leafygreen-ui/lib/';

export default {
  title: 'Components/Modals/ConfirmationModal',
  component: ConfirmationModal,
  args: {
    title: 'Confirm Title Here',
    buttonText: 'Confirm',
    children:
      'This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here. This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here.',
  },
  argTypes: {
    requiredInputText: { control: 'text' },
    open: { control: 'boolean' },
    title: { control: 'text' },
    buttonText: { control: 'text' },
    children: storybookArgTypes.children,
  },
};

const ControlledTemplate: ComponentStory<typeof ConfirmationModal> = args => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open Modal</Button>
      <ConfirmationModal
        {...args}
        open={open}
        onCancel={handleClose}
        onConfirm={handleClose}
      />
    </>
  );
};

export const Basic = ControlledTemplate.bind({});
Basic.args = {
  open: true,
};

export const Delete = ControlledTemplate.bind({});
Delete.args = {
  open: true,
  variant: Variant.Danger,
};
