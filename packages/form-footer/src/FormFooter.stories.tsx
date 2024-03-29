/* eslint-disable react/display-name */
import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
  StoryType,
} from '@lg-tools/storybook-utils';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';

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
      storyNames: ['LightMode', 'DarkMode'],
      combineArgs: {
        backButtonProps: [
          undefined,
          { children: 'Back', leftGlyph: undefined },
          { children: 'Back', leftGlyph: <Icon glyph="ArrowLeft" /> },
        ],
        cancelButtonProps: [undefined, { children: 'Cancel' }],
        errorMessage: [undefined, 'This is an error message'],
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
    cancelButtonText: '', // TODO @stephl3: remove once deprecated props are removed
    errorMessage: 'Error message',
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

const Template: StoryType<typeof FormFooter> = ({
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

export const LiveExample: StoryType<typeof FormFooter> = Template.bind({});
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
LiveExample.args = {
  backButtonProps: { children: 'Back' },
  cancelButtonProps: { children: 'Cancel' },
};

export const WithCustomPrimaryButton: StoryType<typeof FormFooter> =
  Template.bind({});
WithCustomPrimaryButton.args = {
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
  backButtonProps: { children: 'Back' },
  cancelButtonProps: { children: 'Cancel' },
};
WithCustomPrimaryButton.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
  controls: {
    exclude: [
      ...(meta.parameters.controls?.exclude ?? []),
      'primaryButtonText',
    ],
  },
};

export const LightMode: StoryType<typeof FormFooter> = () => <></>;
LightMode.args = {
  darkMode: false,
};
export const DarkMode: StoryType<typeof FormFooter> = () => <></>;
DarkMode.args = {
  darkMode: true,
};
