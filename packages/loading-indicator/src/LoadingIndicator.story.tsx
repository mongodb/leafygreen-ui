import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import {
  DarkModeProps,
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';
import { Body, InlineCode } from '@leafygreen-ui/typography';

import { DisplayOption } from './Spinner/Spinner.types';
import { PageLoader, Spinner } from '.';

const meta: StoryMetaType<any> = {
  title: 'Components/LoadingIndicator',
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    description: { control: 'text' },
  },
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export default meta;

const storyRootStyles = css`
  display: flex;
  gap: 48px;
  align-items: end;
`;

const displayOptionContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const labelStyles = css`
  margin-top: ${spacing[5]}px;
`;

const Template: StoryFn<typeof Spinner> = (
  props: {
    description?: string;
  } & DarkModeProps,
) => (
  <div className={storyRootStyles}>
    {Object.values(DisplayOption).map(displayOption => (
      <div key={displayOption} className={displayOptionContainerStyles}>
        <Spinner displayOption={displayOption} {...props} />
        <Body className={labelStyles} weight="medium">
          <InlineCode>{displayOption}</InlineCode> Spinner
        </Body>
      </div>
    ))}
    <div className={displayOptionContainerStyles}>
      <PageLoader {...props} />
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
