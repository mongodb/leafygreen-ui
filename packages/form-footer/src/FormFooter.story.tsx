import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import FormFooter from '.';
import { storybookArgTypes } from '@leafygreen-ui/lib/';
import { FormFooterProps } from './FormFooter';

export default {
  title: 'Components/FormFooter',
  component: FormFooter,
  parameters: {
    controls: {
      exclude: ['onCancel', 'contentClassName', 'className', 'onBackClick'],
    },
  },
  args: {
    darkMode: false,
    primaryButtonText: 'Primary button text',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    cancelButtonText: { control: 'text' },
    onCancel: { control: 'none' },
    backButtonText: { control: 'text' },
    onBackClick: { control: 'none' },
    errorMessage: { control: 'text' },
    contentClassName: { control: 'text' },
    primaryButtonText: {
      control: 'text',
      description:
        '*Storybook only prop* The primary (right-most) button text.',
    },
  },
} as Meta<typeof FormFooter>;

type FormFooterStoryProps = FormFooterProps & { primaryButtonText?: string };

const Template: ComponentStory<typeof FormFooter> = ({
  primaryButtonText,
  ...args
}: FormFooterStoryProps) => (
  <FormFooter {...args} primaryButton={{ text: primaryButtonText as string }} />
);

export const Basic = Template.bind({});
Basic.parameters = {
  controls: {
    exclude: ['primaryButton'],
  },
};

export const AllButtons = Template.bind({});
AllButtons.args = {
  cancelButtonText: 'Cancel button text',
  backButtonText: 'Back button text',
  errorMessage: 'Error message',
};
AllButtons.parameters = {
  controls: {
    exclude: ['primaryButton'],
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
WithCustomPrimaryButton.parameters = {
  controls: {
    exclude: ['primaryButtonText'],
  },
};

export const InLargerContainer: ComponentStory<typeof FormFooter> = args => (
  <div
    className={css`
      width: 1500px;
    `}
  >
    <FormFooter {...args} />
  </div>
);
InLargerContainer.parameters = {
  controls: {
    exclude: ['primaryButton'],
  },
};
