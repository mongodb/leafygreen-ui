import React, { ReactElement } from 'react';
import { ComponentStory } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import DarkModeGraphic from '../example-graphics/DarkModeGraphic.svg';
import LightModeGraphic from '../example-graphics/LightModeGraphic.svg';

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

const Template: ComponentStory<typeof BasicEmptyState> = props => {
  let graphic: ReactElement | undefined;

  // replace graphic prop with appropriate graphic for theme
  // eslint-disable-next-line react/prop-types
  if (props.graphic) {
    // eslint-disable-next-line react/prop-types
    graphic = props.darkMode ? (
      <DarkModeGraphic viewBox="0 0 298 198" />
    ) : (
      <LightModeGraphic viewBox="0 0 298 198" />
    );
  }

  return <BasicEmptyState {...props} graphic={graphic} />;
};

export const Basic = Template.bind({});

export const WithGraphic = Template.bind({});
WithGraphic.args = {
  graphic: <LightModeGraphic viewBox="0 0 298 198" />,
};

export const WithGraphicAndLink = Template.bind({});
WithGraphicAndLink.args = {
  graphic: <LightModeGraphic viewBox="0 0 298 198" />,
  externalLink: <Link>Test external link</Link>,
};

export const WithActions = Template.bind({});
WithActions.args = {
  graphic: <LightModeGraphic viewBox="0 0 298 198" />,
  primaryButton: <Button>Add Dependency</Button>,
  secondaryButton: <Button>Upload Module</Button>,
};

export const WithActionsAndLink = Template.bind({});
WithActionsAndLink.args = {
  graphic: <LightModeGraphic viewBox="0 0 298 198" />,
  primaryButton: <Button>Add Dependency</Button>,
  secondaryButton: <Button>Upload Module</Button>,
  externalLink: <Link>Test external link</Link>,
};
