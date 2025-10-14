import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryType,
} from '@lg-tools/storybook-utils';

import { FeatureOverview } from '..';

import {
  generateMockFeatures,
  MOCK_SECTION_TITLE,
} from './FeatureOverview.utils';

export default {
  title: 'Composition/FeatureWalls/FeatureOverview',
  component: FeatureOverview,

  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'features'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
    },
  },
  args: {
    darkMode: false,
    features: generateMockFeatures(3),
    title: MOCK_SECTION_TITLE,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryType<typeof FeatureOverview> = props => (
  <FeatureOverview {...props} />
);

export const LiveExample = Template.bind({});
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated: StoryType<typeof FeatureOverview> = Template.bind({});
Generated.parameters = {
  controls: {
    exclude: [
      ...storybookExcludedControlParams,
      'features',
      'title',
      'darkMode',
    ],
  },
};
