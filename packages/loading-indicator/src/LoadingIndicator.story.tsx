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

const variantContainerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const labelStyles = css`
  margin-bottom: ${spacing[4]}px;
`;

const Template: ComponentStory<typeof Spinner> = (
  props: {
    description?: string;
  } & DarkModeProps,
) => (
  <div style={{ display: 'flex', gap: '48px', alignItems: 'top' }}>
    <div className={variantContainerStyles}>
      <Body className={labelStyles} weight="medium">
        <InlineCode>horizontal</InlineCode> Spinner
      </Body>
      <Spinner variant="horizontal" {...props} />
    </div>
    <div className={variantContainerStyles}>
      <Body className={labelStyles} weight="medium">
        <InlineCode>default</InlineCode> Spinner
      </Body>
      <Spinner variant="default" {...props} />
    </div>
    <div className={variantContainerStyles}>
      <Body className={labelStyles} weight="medium">
        <InlineCode>large</InlineCode> Spinner
      </Body>
      <Spinner variant="large" {...props} />
    </div>
    <div className={variantContainerStyles}>
      <Body className={labelStyles} weight="medium">
        <InlineCode>xlarge</InlineCode> Spinner
      </Body>
      <Spinner variant="xlarge" {...props} />
    </div>
    <div className={variantContainerStyles}>
      <Body className={labelStyles} weight="medium">
        Blob Loader
      </Body>
      <BlobLoader {...props} />
    </div>
  </div>
);

export const LiveExample = Template.bind({});
LiveExample.args = {
  description: 'Loading...',
};
