import React from 'react';
import { ComponentStory } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { storybookArgTypes, Theme } from '@leafygreen-ui/lib';
import { Link } from '@leafygreen-ui/typography';

import { graphics } from '../example-graphics';

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

const Template: ComponentStory<typeof FeaturesEmptyState> = props => {
  // eslint-disable-next-line react/prop-types
  const theme = props.darkMode ? Theme.Dark : Theme.Light;

  // replace graphic props with appropriate graphic for theme
  // eslint-disable-next-line react/prop-types
  const features = props.features.map((feature, index) => {
    return {
      ...feature,
      graphic: graphics[theme][index],
    };
  });

  return <FeaturesEmptyState {...props} features={features} />;
};

export const TwoFeatures = Template.bind({});
TwoFeatures.args = {
  features: [
    {
      graphic: graphics[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][1],
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
      graphic: graphics[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
  ],
  PrimaryButton: <Button>Add Dependency</Button>,
  SecondaryButton: <Button>Upload Module</Button>,
};

export const TwoFeaturesWithActionsAndLink = Template.bind({});
TwoFeaturesWithActionsAndLink.args = {
  features: [
    {
      graphic: graphics[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
  ],
  PrimaryButton: <Button>Add Dependency</Button>,
  SecondaryButton: <Button>Upload Module</Button>,
  ExternalLink: <Link>Test external link</Link>,
};

export const ThreeFeatures = Template.bind({});
ThreeFeatures.args = {
  features: [
    {
      graphic: graphics[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][2],
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
      graphic: graphics[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][2],
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
      graphic: graphics[Theme.Light][0],
      title: 'Multi-region, multi-cloud',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][1],
      title: 'Serverless and elastic',
      description:
        'Run powerful and resilient apps that span multiple regions or clouds at once.',
    },
    {
      graphic: graphics[Theme.Light][2],
      title: 'Always-on security',
      description:
        'Secure data with built-in defaults for access and end-toend encryption.',
    },
  ],
  PrimaryButton: <Button>Add Dependency</Button>,
  SecondaryButton: <Button>Upload Module</Button>,
  ExternalLink: <Link>Test external link</Link>,
};
