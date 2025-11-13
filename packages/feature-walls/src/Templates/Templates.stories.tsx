import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryType,
} from '@lg-tools/storybook-utils';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { generateMockTemplates, MOCK_SECTION_TITLE } from './Templates.utils';
import { Templates } from '.';

export default {
  title: 'Composition/FeatureWalls/Templates',
  component: Templates,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'templates'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
      decorator: (Instance: React.ComponentType, context?: any) => (
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <Instance />
        </LeafyGreenProvider>
      ),
    },
  },
  args: {
    darkMode: false,
    templates: generateMockTemplates(3),
    title: MOCK_SECTION_TITLE,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    title: { control: 'text' },
  },
};

const Template: StoryType<typeof Templates> = props => <Templates {...props} />;

export const LiveExample = Template.bind({});
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated: StoryType<typeof Templates> = Template.bind({});
Generated.parameters = {
  controls: {
    exclude: [
      ...storybookExcludedControlParams,
      'darkMode',
      'templates',
      'title',
    ],
  },
};
