import React, { ReactElement } from 'react';
import { ComponentStory } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { storybookArgTypes, Theme } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import DarkModeFeature1 from '../example-graphics/DarkModeFeature1.svg';
import DarkModeFeature2 from '../example-graphics/DarkModeFeature2.svg';
import DarkModeFeature3 from '../example-graphics/DarkModeFeature3.svg';
import LightModeFeature1 from '../example-graphics/LightModeFeature1.svg';
import LightModeFeature2 from '../example-graphics/LightModeFeature2.svg';
import LightModeFeature3 from '../example-graphics/LightModeFeature3.svg';

import { FeaturesEmptyState } from '.';

export default {
  title: 'Components/EmptyState/Features',
  component: FeaturesEmptyState,
  args: {
    title: 'Sample title of features empty state',
  },
  argTypes: {
    features: { control: 'none' },
    ExternalLink: { control: 'none' },
    PrimaryButton: { control: 'none' },
    SecondaryButton: { control: 'none' },
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    controls: {
      exclude: ['className'],
    },
  },
};

const storyThumbnails: Record<Theme, Array<ReactElement>> = {
  [Theme.Dark]: [
    <DarkModeFeature1 key="cloud-feature" viewBox="0 0 72 72" />,
    <DarkModeFeature2 key="serverless-feature" viewBox="0 0 72 72" />,
    <DarkModeFeature3 key="security-feature" viewBox="0 0 72 72" />,
  ],
  [Theme.Light]: [
    <LightModeFeature1 key="cloud-feature" viewBox="0 0 72 72" />,
    <LightModeFeature2 key="serverless-feature" viewBox="0 0 72 72" />,
    <LightModeFeature3 key="security-feature" viewBox="0 0 72 72" />,
  ],
};

const Template: ComponentStory<typeof FeaturesEmptyState> = props => {
  // eslint-disable-next-line react/prop-types
  const theme = props.darkMode ? Theme.Dark : Theme.Light;

  // replace thumbnail props with appropriate graphic for theme
  // eslint-disable-next-line react/prop-types
  const features = props.features.map((feature, index) => {
    return {
      ...feature,
      thumbnail: storyThumbnails[theme][index],
    };
  });

  return <FeaturesEmptyState {...props} features={features} />;
};

export const TwoFeatures = Template.bind({});
TwoFeatures.args = {
  features: [
    {
      thumbnail: storyThumbnails[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      thumbnail: storyThumbnails[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
  ],
};

export const TwoFeaturesWithActions = Template.bind({});
TwoFeaturesWithActions.args = {
  features: [
    {
      thumbnail: storyThumbnails[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      thumbnail: storyThumbnails[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
  ],
  PrimaryButton: <Button>Add Dependency</Button>,
  SecondaryButton: <Button>Upload Module</Button>,
};

export const ThreeFeatures = Template.bind({});
ThreeFeatures.args = {
  features: [
    {
      thumbnail: storyThumbnails[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      thumbnail: storyThumbnails[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      thumbnail: storyThumbnails[Theme.Light][2],
      title: 'Always-on security',
      description:
        'Secure data with built-in defaults for access and end-toend encryption.',
    },
  ],
};

export const ThreeFeaturesWithActions = Template.bind({});
ThreeFeaturesWithActions.args = {
  features: [
    {
      thumbnail: storyThumbnails[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      thumbnail: storyThumbnails[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      thumbnail: storyThumbnails[Theme.Light][2],
      title: 'Always-on security',
      description:
        'Secure data with built-in defaults for access and end-toend encryption.',
    },
  ],
  PrimaryButton: <Button>Add Dependency</Button>,
  SecondaryButton: <Button>Upload Module</Button>,
};

export const ThreeFeaturesWithActionsAndLink = Template.bind({});
ThreeFeaturesWithActionsAndLink.args = {
  features: [
    {
      thumbnail: storyThumbnails[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      thumbnail: storyThumbnails[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      thumbnail: storyThumbnails[Theme.Light][2],
      title: 'Always-on security',
      description:
        'Secure data with built-in defaults for access and end-toend encryption.',
    },
  ],
  PrimaryButton: <Button>Add Dependency</Button>,
  SecondaryButton: <Button>Upload Module</Button>,
  ExternalLink: <Link>Test external link</Link>,
};
