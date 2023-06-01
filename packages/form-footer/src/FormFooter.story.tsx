/* eslint-disable react/display-name */
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

const wrapperStyle = css`
  min-width: 40vw;
  width: 100%;
`;

const meta: StoryMetaType<typeof FormFooter> = {
  title: 'Components/FormFooter',
  component: FormFooter,
  decorators: [
    StoryFn => (
      <div className={wrapperStyle}>
        <StoryFn />
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'contentClassName',
        'onBackClick',
        'primaryButton',
      ],
    },
    generate: {
      props: {
        darkMode: [false, true],
        errorMessage: [undefined, 'This is an error message'],
        backButtonText: [undefined, 'Back'],
        cancelButtonText: ['', 'Cancel'],
      },
      decorator: StoryFn => (
        <div className={wrapperStyle}>
          <StoryFn />
        </div>
      ),
    },
  },
  args: {
    darkMode: false,
    primaryButtonText: 'Button',
    primaryButton: { text: 'Button' },
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
  primaryButton,
  ...args
}: FormFooterStoryProps) => (
  <FormFooter
    {...args}
    primaryButton={
      primaryButton ? primaryButton : { text: primaryButtonText as string }
    }
  />
);

export const LiveExample = Template.bind({});
LiveExample.args = {
  cancelButtonText: 'Cancel button text',
  backButtonText: 'Back button text',
  errorMessage: 'Error message',
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
    exclude: [
      ...(meta.parameters.controls?.exclude ?? []),
      'primaryButtonText',
    ],
  },
};

export const Generated = () => {};
