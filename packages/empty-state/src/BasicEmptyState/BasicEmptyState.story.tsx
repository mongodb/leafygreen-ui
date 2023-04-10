import React, { ReactElement } from 'react';
import { ComponentStory } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { storybookArgTypes, Theme } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import DarkModeGraphic from '../example-graphics/DarkModeGraphic.svg';
import DarkModeSmallGraphic from '../example-graphics/DarkModeSmallGraphic.svg';
import LightModeGraphic from '../example-graphics/LightModeGraphic.svg';
import LightModeSmallGraphic from '../example-graphics/LightModeSmallGraphic.svg';

import { BasicEmptyState } from '.';

export default {
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
    controls: {
      exclude: ['className'],
    },
  },
};
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

const Template: ComponentStory<typeof BasicEmptyState> = ({
  // eslint-disable-next-line react/prop-types
  // @ts-expect-error graphicSize is a Storybook only prop
  graphicSize = 'normal',
  ...rest
}) => {
  // eslint-disable-next-line react/prop-types
  const theme = rest.darkMode ? Theme.Dark : Theme.Light;
  return (
    <BasicEmptyState
      {...rest}
      // eslint-disable-next-line react/prop-types
      graphic={rest.graphic ? graphics[theme][graphicSize] : undefined}
    />
  );
};

export const Basic = Template.bind({});

export const WithSmallGraphic = Template.bind({});
WithSmallGraphic.args = {
  graphic: <LightModeSmallGraphic viewBox="0 0 198 131" />,
  title: 'No results found',
  description: `Try adjusting your keywords to find what you're looking for.`,
  primaryButton: <Button>Add Dependency</Button>,
  secondaryButton: <Button>Upload Module</Button>,
  externalLink: <Link>Test external link</Link>,
  // @ts-expect-error graphicSize is a Storybook only prop
  graphicSize: 'small',
};

export const WithActionsAndLink = Template.bind({});
WithActionsAndLink.args = {
  graphic: <LightModeGraphic viewBox="0 0 298 198" />,
  primaryButton: <Button>Add Dependency</Button>,
  secondaryButton: <Button>Upload Module</Button>,
  externalLink: <Link>Test external link</Link>,
  // @ts-expect-error graphicSize is a Storybook only prop
  graphicSize: 'normal',
};
