import React from 'react';
import { ComponentStory } from '@storybook/react';

import { DarkModeProps, storybookArgTypes } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

import BasicEmptyStateStory, {
  WithActionsAndLink,
  WithSmallGraphic,
} from './BasicEmptyState/BasicEmptyState.story';
import FeaturesEmptyStateStory, {
  ThreeFeaturesWithSecondaryActionAndLink,
  TwoFeaturesWithSecondaryActionAndLink,
} from './FeaturesEmptyState/FeaturesEmptyState.story';

const StoryVariant = {
  Basic: 'Basic',
  BasicWithSmallAsset: 'BasicWithSmallAsset',
  TwoFeatures: 'Two Features',
  ThreeFeatures: 'Three Features',
} as const;

type StoryVariant = typeof StoryVariant[keyof typeof StoryVariant];

const ButtonConfiguration = {
  None: 'No Buttons',
  PrimaryOnly: 'Primary Only',
  BothButtons: 'Primary and Secondary',
} as const;

type ButtonConfiguration =
  typeof ButtonConfiguration[keyof typeof ButtonConfiguration];

interface EmptyStateStoryProps extends DarkModeProps {
  variant: StoryVariant;
  buttonConfiguration: ButtonConfiguration;
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
    buttonConfiguration: {
      control: 'radio',
      options: Object.values(ButtonConfiguration),
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
  // @ts-expect-error Props for the LiveExample story do not correspond to documented component's props
  // eslint-disable-next-line react/prop-types
  buttonConfiguration,
  ...rest
}) => {
  let StoryComponent: ComponentStory<any> = WithActionsAndLink;
  let storyComponentProps: any = {};

  if (variant === StoryVariant.Basic) {
    StoryComponent = WithActionsAndLink;
    storyComponentProps = {
      ...BasicEmptyStateStory.args,
      ...WithActionsAndLink.args,
    };
  } else if (variant === StoryVariant.BasicWithSmallAsset) {
    StoryComponent = WithSmallGraphic;
    storyComponentProps = {
      ...BasicEmptyStateStory.args,
      ...WithSmallGraphic.args,
    };
  } else if (variant === StoryVariant.TwoFeatures) {
    StoryComponent = TwoFeaturesWithSecondaryActionAndLink;
    storyComponentProps = {
      ...FeaturesEmptyStateStory.args,
      ...TwoFeaturesWithSecondaryActionAndLink.args,
    };
  } else if (variant === StoryVariant.ThreeFeatures) {
    StoryComponent = ThreeFeaturesWithSecondaryActionAndLink;
    storyComponentProps = {
      ...FeaturesEmptyStateStory.args,
      ...ThreeFeaturesWithSecondaryActionAndLink.args,
    };
  }

  if (buttonConfiguration === ButtonConfiguration.None) {
    if (variant === StoryVariant.Basic)
      delete storyComponentProps['primaryButton'];
    delete storyComponentProps['secondaryButton'];
  } else if (buttonConfiguration === ButtonConfiguration.PrimaryOnly) {
    delete storyComponentProps['secondaryButton'];
  }

  return (
    <>
      <StoryComponent {...storyComponentProps} {...rest} />
      <div style={{ marginTop: spacing[4] }}>
        * Note: Controls below are designed specifically for the Live Example
        and may not correspond to the React component&apos;s properties.
      </div>
    </>
  );
};
