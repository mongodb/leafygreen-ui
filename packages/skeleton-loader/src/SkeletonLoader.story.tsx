import React from 'react';
import { storybookArgTypes, StoryType } from '@lg-tools/storybook-utils';

import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { Body, InlineCode } from '@leafygreen-ui/typography';

import { SharedSkeletonProps } from './Skeleton/Skeleton.types';
import {
  CardSkeleton,
  CodeSkeleton,
  FormSkeleton,
  ListSkeleton,
  ParagraphSkeleton,
  Skeleton,
  TableSkeleton,
} from '.';

export default {
  title: 'Components/SkeletonLoader',
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    enableAnimations: { control: 'boolean' },
  },
  args: {
    enableAnimations: true,
  },
  parameters: {
    default: 'LiveExample',
  },
};

const storyRootStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${spacing[7]}px;
  row-gap: ${spacing[7]}px;
  padding: ${spacing[7]}px;
`;

const displayOptionContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  max-width: 700px;
`;

const labelStyles = css`
  margin-top: ${spacing[5]}px;
`;

const skeletonComponents = {
  Skeleton,
  CardSkeleton,
  CodeSkeleton,
  FormSkeleton,
  ListSkeleton,
  ParagraphSkeleton,
  TableSkeleton,
};

export const LiveExample: StoryType<any> = (args: SharedSkeletonProps) => (
  <div className={storyRootStyles}>
    {Object.entries(skeletonComponents).map(([name, SkeletonVariant]) => (
      <div key={name} className={displayOptionContainerStyles}>
        <SkeletonVariant {...args} />
        <Body className={labelStyles} weight="medium">
          <InlineCode>{name}</InlineCode>
        </Body>
      </div>
    ))}
  </div>
);
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};
