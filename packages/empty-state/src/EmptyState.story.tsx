import React from 'react';
import { ComponentStory } from '@storybook/react';

import { DarkModeProps, storybookArgTypes } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

import BasicEmptyStateStory, {
  WithActionsAndLink,
} from './BasicEmptyState/BasicEmptyState.story';
import FeaturesEmptyStateStory, {
  ThreeFeaturesWithActionsAndLink,
  TwoFeaturesWithActionsAndLink,
} from './FeaturesEmptyState/FeaturesEmptyState.story';

const StoryVariant = {
  Basic: 'Basic',
  TwoFeatures: 'Two Features',
  ThreeFeatures: 'Three Features',
} as const;

type StoryVariant = typeof StoryVariant[keyof typeof StoryVariant];

interface EmptyStateStoryProps extends DarkModeProps {
  variant: StoryVariant;
}

export default {
  title: 'Components/EmptyState',
  args: {
    variant: StoryVariant.Basic,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: Object.values(StoryVariant),
    },
    graphic: { control: 'none' },
    externalLink: { control: 'none' },
    primaryButton: { control: 'none' },
    secondaryButton: { control: 'none' },
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: ['className'],
    },
  },
};

// @ts-expect-error Props for the LiveExample story do not correspond to documented component's props
export const LiveExample: ComponentStory<EmptyStateStoryProps> = ({
  // @ts-expect-error Props for the LiveExample story do not correspond to documented component's props
  // eslint-disable-next-line react/prop-types
  variant,
  ...rest
}) => {
  return (
    <>
      <div style={{ marginBottom: spacing[4] }}>
        * Note: Controls on LiveExample are designed specifically for the Live
        Example and may not correspond to the React component&apos;s properties.
      </div>
      {variant === StoryVariant.Basic && (
        <WithActionsAndLink
          {...BasicEmptyStateStory.args}
          {...WithActionsAndLink.args}
          {...rest}
        />
      )}
      {variant === StoryVariant.TwoFeatures && (
        <TwoFeaturesWithActionsAndLink
          {...FeaturesEmptyStateStory.args}
          {...TwoFeaturesWithActionsAndLink.args}
          {...rest}
        />
      )}
      {variant === StoryVariant.ThreeFeatures && (
        <ThreeFeaturesWithActionsAndLink
          {...FeaturesEmptyStateStory.args}
          {...ThreeFeaturesWithActionsAndLink.args}
          {...rest}
        />
      )}
    </>
  );
};
