import React from 'react';
import { StoryFn, StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes, storybookExcludedControlParams } from '@lg-tools/storybook-utils';

import { Color, Illustration, IllustrationProps, Name } from './Illustration';

export default {
  title: 'Components/Illustration',
  component: Illustration,
  decorators: [
    StoryFn => (
      <div
        className={css`
          margin: -100px;
          height: 100vh;
        `}
      >
        <StoryFn />
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: storybookExcludedControlParams,
    },
  },
  args: {
    color: Color.None,
    darkMode: false,
    name: Name.AppDeveloper,
  },
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(Color),
      defaultValue: Color.None,
    },
    darkMode: storybookArgTypes.darkMode,
    name: {
      control: 'select',
      options: Object.values(Name),
    },
  },
};

const Template: StoryFn<IllustrationProps> = props => (
  <Illustration {...props} />
);

export const LiveExample: StoryObj<IllustrationProps> = {
  render: Template,
};
