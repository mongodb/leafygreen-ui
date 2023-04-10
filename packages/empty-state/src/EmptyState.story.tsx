import React from 'react';
import { ComponentStory } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes, StoryMeta } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

import BasicEmptyStateStoryMeta, {
  WithActionsAndLink,
  WithSmallGraphic,
} from './BasicEmptyState/BasicEmptyState.story';
import FeaturesEmptyStateStoryMeta, {
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

export default StoryMeta({
  title: 'Components/EmptyState',
  args: {
    variant: StoryVariant.Basic,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: Object.values(StoryVariant),
    },
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: ['className', 'as'],
    },
  },
});

export const LiveExample = ({
  // @ts-expect-error Props for the LiveExample story do not correspond to documented component's props
  // eslint-disable-next-line react/prop-types
  variant,
  ...rest
}) => {
  let StoryComponent: ComponentStory<any> = WithActionsAndLink;
  let storyComponentProps: unknown = {};

  if (variant === StoryVariant.Basic) {
    StoryComponent = WithActionsAndLink;
    storyComponentProps = {
      ...BasicEmptyStateStoryMeta.args,
      ...WithActionsAndLink.args,
    };
  } else if (variant === StoryVariant.BasicWithSmallAsset) {
    StoryComponent = WithSmallGraphic;
    storyComponentProps = {
      ...BasicEmptyStateStoryMeta.args,
      ...WithSmallGraphic.args,
    };
  } else if (variant === StoryVariant.TwoFeatures) {
    StoryComponent = TwoFeaturesWithSecondaryActionAndLink;
    storyComponentProps = {
      ...FeaturesEmptyStateStoryMeta.args,
      ...TwoFeaturesWithSecondaryActionAndLink.args,
    };
  } else if (variant === StoryVariant.ThreeFeatures) {
    StoryComponent = ThreeFeaturesWithSecondaryActionAndLink;
    storyComponentProps = {
      ...FeaturesEmptyStateStoryMeta.args,
      ...ThreeFeaturesWithSecondaryActionAndLink.args,
    };
  }

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <StoryComponent {...storyComponentProps} {...rest} />
      <div style={{ marginTop: spacing[4] }}>
        * Note: Controls below are designed specifically for the Live Example
        and may not correspond to the React component&apos;s properties.
      </div>
    </div>
  );
};
