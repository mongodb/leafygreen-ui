import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryType,
} from '@lg-tools/storybook-utils';

import { css } from '@leafygreen-ui/emotion';
import ArrowRight from '@leafygreen-ui/icon/dist/ArrowRight';

import { Header } from '..';

import { MOCK_SAMPLE_TEXT } from './Header.utils';

const removeStorybookPadding = css`
  margin: -100px;
`;

export default {
  title: 'Composition/FeatureWalls/Header',
  component: Header,
  decorators: [
    StoryFn => (
      <div className={removeStorybookPadding}>
        <StoryFn />
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
    generate: {
      storyNames: ['LightMode', 'DarkMode'],
      combineArgs: {
        subtitle: [undefined, MOCK_SAMPLE_TEXT.subtitle],
        description: [undefined, MOCK_SAMPLE_TEXT.description],
        secondaryButtonProps: [
          undefined,
          { children: MOCK_SAMPLE_TEXT.secondaryButton },
        ],
      },
    },
  },
  args: {
    subtitle: MOCK_SAMPLE_TEXT.subtitle,
    title: MOCK_SAMPLE_TEXT.title,
    description: MOCK_SAMPLE_TEXT.description,
    primaryButtonProps: {
      children: MOCK_SAMPLE_TEXT.primaryButton,
    },
    secondaryButtonProps: {
      children: MOCK_SAMPLE_TEXT.secondaryButton,
      leftGlyph: <ArrowRight />,
    },
    darkMode: false,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    description: { control: 'text' },
    subtitle: { control: 'text' },
    title: { control: 'text' },
  },
};

const Template: StoryType<typeof Header> = props => <Header {...props} />;

export const LiveExample = Template.bind({});
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const LightMode: StoryType<typeof Header> = () => <></>;
LightMode.args = {
  darkMode: false,
};
export const DarkMode: StoryType<typeof Header> = () => <></>;
DarkMode.args = {
  darkMode: true,
};
