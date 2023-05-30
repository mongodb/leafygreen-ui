import React from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import FormFooter, { FormFooterProps } from '.';

const meta: StoryMetaType<typeof FormFooter> = {
  title: 'Components/FormFooter',
  component: FormFooter,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'contentClassName',
        'onBackClick',
      ],
    },
    wrapperStyle: css`
      width: 90%;
    `,
  },
  args: {
    darkMode: false,
    primaryButtonText: 'Button',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    cancelButtonText: { control: 'text' },
    backButtonText: { control: 'text' },
    errorMessage: { control: 'text' },
    contentClassName: { control: 'text' },
    primaryButtonText: {
      control: 'text',
      description:
        '*Storybook only prop* The primary (right-most) button text.',
    },
  },
};
export default meta;

type FormFooterStoryProps = FormFooterProps & { primaryButtonText?: string };

const Template: StoryFn<FormFooterProps> = ({
  primaryButtonText,
  ...args
}: FormFooterStoryProps) => (
  <FormFooter
    className={css`
      width: 100%;
    `}
    {...args}
    primaryButton={{ text: primaryButtonText as string }}
  />
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

export const InLargerContainer: StoryFn<FormFooterProps> = args => (
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
