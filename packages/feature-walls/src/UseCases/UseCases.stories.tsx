import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { UseCases, UseCasesProps } from '..';

import { generateMockUseCases, MOCK_SECTION_TITLE } from './UseCases.utils';

const meta: StoryMetaType<typeof UseCases> = {
  title: 'Composition/FeatureWalls/UseCases',
  component: UseCases,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'cases'],
    },
    generate: {
      storyNames: ['ThreeColumn', 'FourColumn'],
      combineArgs: {
        darkMode: [false, true],
        cases: [
          generateMockUseCases(3),
          generateMockUseCases(4),
          generateMockUseCases(6),
        ],
      },
      decorator: (Instance, context) => (
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <Instance />
        </LeafyGreenProvider>
      ),
    },
  },
  args: {
    darkMode: false,
    maxColumns: 3,
    numberOfUseCases: 6,
    title: MOCK_SECTION_TITLE,
    cases: generateMockUseCases(6),
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    maxColumns: { control: 'radio' },
    numberOfUseCases: {
      name: 'cases.length',
      description:
        'This control is used to determine how many use cases should be rendered in the story. It is recommended that the use cases section should not exceed 3 rows.',
      control: {
        min: 2,
        max: 12,
        step: 1,
        type: 'number',
      },
    },
  },
};
export default meta;

type TemplateProps = UseCasesProps & {
  numberOfUseCases: number;
};

const Template: StoryFn<TemplateProps> = ({ numberOfUseCases, ...rest }) => (
  <UseCases {...rest} cases={generateMockUseCases(numberOfUseCases)} />
);

export const LiveExample = Template.bind({});
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ThreeColumn = Template.bind({});
ThreeColumn.args = {
  maxColumns: 3,
};
ThreeColumn.parameters = {
  controls: {
    exclude: [
      ...storybookExcludedControlParams,
      'cases',
      'cases.length',
      'darkMode',
      'maxColumns',
      'title',
    ],
  },
};

export const FourColumn = Template.bind({});
FourColumn.args = {
  maxColumns: 4,
};
FourColumn.parameters = {
  controls: {
    exclude: [
      ...storybookExcludedControlParams,
      'cases',
      'cases.length',
      'darkMode',
      'maxColumns',
      'title',
    ],
  },
};
