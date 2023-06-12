import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { DarkModeProps, storybookArgTypes } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';
import { Body, InlineCode } from '@leafygreen-ui/typography';

import {
  CardSkeleton,
  FormSkeleton,
  ParagraphSkeleton,
  Skeleton,
  TableSkeleton,
} from '.';

export default {
  title: 'Components/SkeletonLoader',
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
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

export const LiveExample: StoryFn<any> = (props: DarkModeProps) => (
  <div className={storyRootStyles}>
    <div className={displayOptionContainerStyles}>
      <Skeleton />
      <Body className={labelStyles} weight="medium">
        <InlineCode>Skeleton</InlineCode>
      </Body>
    </div>
    <div className={displayOptionContainerStyles}>
      <ParagraphSkeleton withHeader />
      <Body className={labelStyles} weight="medium">
        <InlineCode>ParagraphSkeleton</InlineCode>
      </Body>
    </div>
    <div className={displayOptionContainerStyles}>
      <CardSkeleton />
      <Body className={labelStyles} weight="medium">
        <InlineCode>CardSkeleton</InlineCode>
      </Body>
    </div>
    <div className={displayOptionContainerStyles}>
      <FormSkeleton {...props} />
      <Body className={labelStyles} weight="medium">
        <InlineCode>FormSkeleton</InlineCode>
      </Body>
    </div>
    <div className={displayOptionContainerStyles}>
      <TableSkeleton />
      <Body className={labelStyles} weight="medium">
        <InlineCode>TableSkeleton</InlineCode>
      </Body>
    </div>
  </div>
);
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};
