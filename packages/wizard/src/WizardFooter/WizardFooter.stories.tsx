import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { Variant } from '@leafygreen-ui/button';
import Icon, { glyphs } from '@leafygreen-ui/icon';

import { WizardFooter, type WizardFooterProps } from '.';

type PrimaryButtonVariant =
  Required<WizardFooterProps>['primaryButtonProps']['variant'];
interface StoryArgs {
  backButtonText: string;
  backButtonIcon: keyof typeof glyphs;
  cancelButtonText: string;
  primaryButtonText: string;
  primaryButtonIcon: keyof typeof glyphs;
  primaryButtonVariant: PrimaryButtonVariant;
}

const meta: StoryMetaType<typeof WizardFooter, StoryArgs> = {
  title: 'Components/Wizard/WizardFooter',
  component: WizardFooter,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: ['backButtonProps', 'cancelButtonProps', 'primaryButtonProps'],
    },
  },
  args: {},
  argTypes: {
    backButtonText: { control: 'text' },
    backButtonIcon: { control: 'select', options: Object.keys(glyphs) },
    cancelButtonText: { control: 'text' },
    primaryButtonText: { control: 'text' },
    primaryButtonIcon: { control: 'select', options: Object.keys(glyphs) },
    primaryButtonVariant: {
      control: 'select',
      options: [Variant.Primary, Variant.Danger],
    },
  },
};

export default meta;

export const LiveExample: StoryObj<StoryArgs> = {
  args: {
    backButtonText: 'Back',
    backButtonIcon: 'ArrowLeft',
    cancelButtonText: 'Cancel',
    primaryButtonText: 'Continue',
    primaryButtonIcon: 'Ellipsis',
    primaryButtonVariant: Variant.Primary,
  },
  render: args => (
    <WizardFooter
      backButtonProps={{
        leftGlyph: args.backButtonIcon ? (
          <Icon glyph={args.backButtonIcon} />
        ) : undefined,
        children: args.backButtonText,
      }}
      cancelButtonProps={{
        children: args.cancelButtonText,
      }}
      primaryButtonProps={{
        leftGlyph: args.primaryButtonIcon ? (
          <Icon glyph={args.primaryButtonIcon} />
        ) : undefined,
        children: args.primaryButtonText,
        variant: args.primaryButtonVariant,
      }}
    />
  ),
};
