import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';

import BasicEmptyStateStoryMeta, {
  WithBadgeAndActionsAndLink,
  WithSmallGraphic,
} from './BasicEmptyState/BasicEmptyState.stories';
import FeaturesEmptyStateStoryMeta, {
  ThreeFeaturesWithSecondaryActionAndLink,
  TwoFeaturesWithSecondaryActionAndLink,
} from './FeaturesEmptyState/FeaturesEmptyState.stories';
import {
  BasicEmptyState,
  type BasicEmptyStateProps,
  FeaturesEmptyState,
  type FeaturesEmptyStateProps,
} from '.';

const StoryVariant = {
  Basic: 'Basic',
  BasicWithSmallAsset: 'BasicWithSmallAsset',
  TwoFeatures: 'Two Features',
  ThreeFeatures: 'Three Features',
} as const;

type StoryVariant = (typeof StoryVariant)[keyof typeof StoryVariant];
type StoryProps = BasicEmptyStateProps &
  FeaturesEmptyStateProps & { variant: StoryVariant };

const meta: StoryMetaType<typeof BasicEmptyState | typeof FeaturesEmptyState> =
  {
    title: 'Components/EmptyState',
    args: {
      variant: StoryVariant.Basic,
    },
    argTypes: {
      variant: {
        control: 'select',
        options: Object.values(StoryVariant),
      },
      darkMode: storybookArgTypes.darkMode,
    },
    parameters: {
      default: 'LiveExample',
    },
  };

export default meta;

export const LiveExample: StoryFn<StoryProps> = ({
  variant,
  ...rest
}: StoryProps) => {
  let StoryComponent: StoryFn<BasicEmptyStateProps | FeaturesEmptyStateProps> =
    WithBadgeAndActionsAndLink;
  let storyComponentProps: BasicEmptyStateProps | FeaturesEmptyStateProps =
    {} as BasicEmptyStateProps | FeaturesEmptyStateProps;

  if (variant === StoryVariant.Basic) {
    StoryComponent = WithBadgeAndActionsAndLink;
    storyComponentProps = {
      ...BasicEmptyStateStoryMeta.args,
      ...WithBadgeAndActionsAndLink.args,
    } as BasicEmptyStateProps;
  } else if (variant === StoryVariant.BasicWithSmallAsset) {
    StoryComponent = WithSmallGraphic;
    storyComponentProps = {
      ...BasicEmptyStateStoryMeta.args,
      ...WithSmallGraphic.args,
    } as BasicEmptyStateProps;
  } else if (variant === StoryVariant.TwoFeatures) {
    StoryComponent = TwoFeaturesWithSecondaryActionAndLink;
    storyComponentProps = {
      ...FeaturesEmptyStateStoryMeta.args,
      ...TwoFeaturesWithSecondaryActionAndLink.args,
    } as FeaturesEmptyStateProps;
  } else if (variant === StoryVariant.ThreeFeatures) {
    StoryComponent = ThreeFeaturesWithSecondaryActionAndLink;
    storyComponentProps = {
      ...FeaturesEmptyStateStoryMeta.args,
      ...ThreeFeaturesWithSecondaryActionAndLink.args,
    } as FeaturesEmptyStateProps;
  }

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      {/* @ts-expect-error - props are not specific enough */}
      <StoryComponent {...storyComponentProps} {...rest} />
    </div>
  );
};
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
