import React from 'react';
import ConfirmationModal, { Variant } from '.';

export default {
  title: 'Packages/Modals/ConfirmationModal',
  component: ConfirmationModal,
  args: {
    title: 'Confirm Title Here',
    buttonText: 'Confirm',
    requiredInputText: false,
    children:
      'This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here. This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here.',
  },
  parameters: {
    controls: { exclude: ['children'] },
  },
};

const Template = args => <ConfirmationModal {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  open: true,
};

export const Delete = Template.bind({});
Delete.args = {
  open: true,
  variant: Variant.Danger,
};
