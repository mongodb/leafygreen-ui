import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import FormFooter from '.';

export default {
  title: 'Components/FormFooter',
  component: FormFooter,
  argTypes: {
    cancelButtonText: { control: 'text' },
    onCancel: { control: 'none' },
    backButtonText: { control: 'text' },
    onBackClick: { control: 'none' },
    errorMessage: { control: 'text' },
    contentClassName: { control: 'text' },
  },
} as Meta<typeof FormFooter>;

const Template: ComponentStory<typeof FormFooter> = args => (
  <FormFooter {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  primaryButton: {
    text: 'Primary button text',
  },
};

export const AllButtons = Template.bind({});
AllButtons.args = {
  cancelButtonText: 'Cancel button text',
  backButtonText: 'Back button text',
  errorMessage: 'Error message',
  primaryButton: {
    text: 'Primary button text',
  },
};

export const WithCustomPrimaryButton = Template.bind({});
WithCustomPrimaryButton.args = {
  cancelButtonText: 'Cancel button text',
  backButtonText: 'Back button text',
  errorMessage: 'Error message',
  primaryButton: (
    <Button
      leftGlyph={<Icon glyph={'Cloud'} />}
      rightGlyph={<Icon glyph={'Checkmark'} />}
      variant="primary"
      disabled
    >
      Save to cloud
    </Button>
  ),
};

export const InLargerContainer: ComponentStory<typeof FormFooter> = args => (
  <div
    className={css`
      width: 2000px;
    `}
  >
    <FormFooter {...args} />
  </div>
);
InLargerContainer.args = {
  primaryButton: {
    text: 'Primary button text',
  },
};
