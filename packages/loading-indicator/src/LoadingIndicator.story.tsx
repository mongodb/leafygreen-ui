import React from 'react';
import { ComponentStory } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import {
  DarkModeProps,
  storybookArgTypes,
  StoryMeta,
} from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';
import { Body, InlineCode } from '@leafygreen-ui/typography';

import BlobLoader from './BlobLoader';
import { Spinner } from '.';

export default StoryMeta({
  title: 'Components/LoadingIndicator',
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    description: { control: 'text' },
  },
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: ['className', 'baseFontSize'],
    },
  },
});

const storyRootStyles = css`
  display: flex;
  gap: 48px;
  align-items: end;
`;

const variantContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const labelStyles = css`
  margin-top: ${spacing[5]}px;
`;

const Template: ComponentStory<typeof Spinner> = (
  props: {
    description?: string;
  } & DarkModeProps,
) => (
  <div className={storyRootStyles}>
    <div className={variantContainerStyles}>
      <Spinner variant="horizontal" {...props} />
      <Body className={labelStyles} weight="medium">
        <InlineCode>horizontal</InlineCode> Spinner
      </Body>
    </div>
    <div className={variantContainerStyles}>
      <Spinner variant="default" {...props} />
      <Body className={labelStyles} weight="medium">
        <InlineCode>default</InlineCode> Spinner
      </Body>
    </div>
    <div className={variantContainerStyles}>
      <Spinner variant="large" {...props} />
      <Body className={labelStyles} weight="medium">
        <InlineCode>large</InlineCode> Spinner
      </Body>{' '}
    </div>
    <div className={variantContainerStyles}>
      <Spinner variant="xlarge" {...props} />
      <Body className={labelStyles} weight="medium">
        <InlineCode>xlarge</InlineCode> Spinner
      </Body>
    </div>
    <div className={variantContainerStyles}>
      <BlobLoader {...props} />
      <Body className={labelStyles} weight="medium">
        Blob Loader
      </Body>{' '}
    </div>
  </div>
);

export const LiveExample = Template.bind({});
LiveExample.args = {
  description: 'Loading...',
};
