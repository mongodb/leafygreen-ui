import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { UseCases, UseCasesProps } from '..';

import { generateMockUseCases, MOCK_SECTION_TITLE } from './UseCases.utils';

export default {
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

export const ThreeColumn: StoryType<typeof UseCases> = Template.bind({});
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

export const FourColumn: StoryType<typeof UseCases> = Template.bind({});
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
