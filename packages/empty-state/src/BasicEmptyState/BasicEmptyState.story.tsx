import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
  Theme,
} from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import DarkModeGraphic from '../example-graphics/DarkModeGraphic.svg';
import DarkModeSmallGraphic from '../example-graphics/DarkModeSmallGraphic.svg';
import LightModeGraphic from '../example-graphics/LightModeGraphic.svg';
import LightModeSmallGraphic from '../example-graphics/LightModeSmallGraphic.svg';

import { BasicEmptyState, BasicEmptyStateProps } from '.';

const meta: StoryMetaType<typeof BasicEmptyState> = {
  title: 'Components/EmptyState/Basic',
  component: BasicEmptyState,
  args: {
    title: 'Triggers have no dependencies yet',
    description:
      'This example displays the maximum line width of body content. This is to prevent extremely long body content that is difficult to read.',
  },
  argTypes: {
    graphic: { control: 'none' },
    description: { control: 'text' },
    externalLink: { control: 'none' },
    primaryButton: { control: 'none' },
    secondaryButton: { control: 'none' },
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    default: null,
    controls: {
      exclude: [...storybookExcludedControlParams, 'graphicSize'],
    },
    chromatic: {
      disableSnapshot: true,
    },
    generate: {
      storyNames: ['Generated'],
      combineArgs: {
        darkMode: [false, true],
        graphic: [
          undefined,
          <LightModeSmallGraphic
            key="generated-graphic"
            viewBox="0 0 198 131"
          />,
        ],
        primaryButton: [
          undefined,
          <Button key="generated-button">Add Dependency</Button>,
        ],
        secondaryButton: [
          undefined,
          <Button key="generated-button-2">Upload Modules</Button>,
        ],
        externalLink: [
          undefined,
          <Link key="generated-link" href="https://www.mongodb.com">
            Test external link
          </Link>,
        ],
      },
      excludeCombinations: [
        {
          primaryButton: undefined,
          secondaryButton: <Button>Upload Modules</Button>,
        },
      ],
    },
  },
};
export default meta;

const graphics: Record<Theme, Record<string, ReactElement>> = {
  [Theme.Dark]: {
    small: <DarkModeSmallGraphic viewBox="0 0 198 131" />,
    normal: <DarkModeGraphic viewBox="0 0 298 198" />,
  },
  [Theme.Light]: {
    small: <LightModeSmallGraphic viewBox="0 0 198 131" />,
    normal: <LightModeGraphic viewBox="0 0 298 198" />,
  },
};

const Template: StoryFn<BasicEmptyStateProps> = ({
  // eslint-disable-next-line react/prop-types
  graphicSize = 'normal',
  ...rest
}) => {
  // eslint-disable-next-line react/prop-types
  const theme = rest.darkMode ? Theme.Dark : Theme.Light;
  return (
    <BasicEmptyState
      {...(rest as BasicEmptyStateProps)}
      // eslint-disable-next-line react/prop-types
      graphic={rest.graphic ? graphics[theme][graphicSize] : undefined}
    />
  );
};

export const Basic = Template.bind({});
export const Generated = Template.bind({});
Generated.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const WithSmallGraphic = Template.bind({});
WithSmallGraphic.args = {
  graphic: <LightModeSmallGraphic viewBox="0 0 198 131" />,
  title: 'No results found',
  description: `Try adjusting your keywords to find what you're looking for.`,
  externalLink: <Link href="https://www.mongodb.com">Test external link</Link>,
  // @ts-expect-error graphicSize is a Storybook only prop
  graphicSize: 'small',
};

export const WithActionsAndLink = Template.bind({});
WithActionsAndLink.args = {
  graphic: <LightModeGraphic viewBox="0 0 298 198" />,
  primaryButton: <Button>Add Dependency</Button>,
  secondaryButton: <Button>Upload Module</Button>,
  externalLink: <Link href="https://www.mongodb.com">Test external link</Link>,
  // @ts-expect-error graphicSize is a Storybook only prop
  graphicSize: 'normal',
};
