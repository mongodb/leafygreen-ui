import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import {
  SegmentedControl,
  SegmentedControlProps,
} from '@leafygreen-ui/segmented-control';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { Size } from './SegmentedControl/SegmentedControl.types';
import { TestChildren } from './SegmentedControl.testutils';

interface LiveExampleProps {
  childrenOptions: keyof typeof TestChildren;
}

const meta: StoryMetaType<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'children',
        'value',
        'defaultValue',
      ],
    },
    chromatic: {
      delay: transitionDuration.default,
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        children: [
          TestChildren.Basic,
          TestChildren.WithIcons,
          TestChildren.IconsOnly,
        ],
        size: Object.values(Size),
        label: [undefined, 'Select'],
      },
    },
  },
  args: {
    label: 'Fruit',
    name: 'fruit',
    childrenOptions: 'Basic',
  },
  argTypes: {
    childrenOptions: {
      control: 'select',
      options: Object.keys(TestChildren),
      description: 'LiveExample toggle for children',
    },
    label: { control: 'text' },
    name: { control: 'text' },
    defaultValue: { control: 'text' },
    value: { control: 'text' },
    followFocus: { control: 'boolean' },
    'aria-controls': { control: 'text' },
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    darkMode: storybookArgTypes.darkMode,
    baseFontSize: storybookArgTypes.updatedBaseFontSize,
  },
};
export default meta;

export const LiveExample: StoryFn<SegmentedControlProps & LiveExampleProps> = (
  args: SegmentedControlProps & LiveExampleProps,
) => (
  <SegmentedControl {...args}>
    {TestChildren[args.childrenOptions]}
  </SegmentedControl>
);
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Generated = () => <></>;
