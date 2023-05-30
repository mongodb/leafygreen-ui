import React from 'react';
import { StoryFn } from '@storybook/react';

import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import {
  SegmentedControl,
  SegmentedControlOption,
  SegmentedControlProps,
} from '@leafygreen-ui/segmented-control';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { Size } from './SegmentedControl/SegmentedControl.types';
import { TestChildren } from './SegmentedControl.testutils';

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
      props: {
        darkMode: [false, true],
        size: Object.values(Size),
        children: [
          TestChildren.Basic,
          TestChildren.WithIcons,
          TestChildren.IconsOnly,
        ],
        label: [undefined, 'Select'],
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    defaultValue: { control: 'text' },
    value: { control: 'text' },
    followFocus: { control: 'boolean' },
    'aria-controls': { control: 'text' },
    size: {
      control: {
        type: 'radio',
        options: [...Object.values(Size)],
      },
    },
    darkMode: storybookArgTypes.darkMode,
    baseFontSize: storybookArgTypes.updatedBaseFontSize,
  },
};
export default meta;

export const LiveExample: StoryFn<SegmentedControlProps> = (
  args: SegmentedControlProps,
) => <SegmentedControl {...args} />;
LiveExample.args = {
  label: 'Fruit',
  name: 'fruit',
  children: [
    <SegmentedControlOption key="dragonfruit" value="dragonfruit">
      Dragonfruit
    </SegmentedControlOption>,
    <SegmentedControlOption key="eggplant" value="eggplant">
      Eggplant
    </SegmentedControlOption>,
    <SegmentedControlOption key="fig" value="fig">
      Fig
    </SegmentedControlOption>,
    <SegmentedControlOption disabled key="grape" value="grape">
      Grape
    </SegmentedControlOption>,
  ],
};

/*
export const Controlled: StoryFn<SegmentedControlProps> = (
  args: SegmentedControlProps,
) => {
  const [selectedFruit, setSelectedFruit] = useState('eggplant');
  return (
    <LiveExample
      {...args}
      key="selectedFruit"
      value={selectedFruit}
      onChange={setSelectedFruit}
    />
  );
};
Controlled.args = {
  label: 'Fruit overwhelmed',
  name: 'fruit',
  children: [
    <SegmentedControlOption key="dragonfruit" value="dragonfruit">
      Dragonfruit fruit
    </SegmentedControlOption>,
    <SegmentedControlOption key="eggplant" value="eggplant">
      Eggplant bananana
    </SegmentedControlOption>,
    <SegmentedControlOption key="fig" value="fig">
      Fig
    </SegmentedControlOption>,
    <SegmentedControlOption key="grape" value="grape">
      Grape
    </SegmentedControlOption>,
  ],
};*/

// export const WithIcons = LiveExample.bind({});
// WithIcons.args = {
//   label: 'View as',
//   name: 'language',
//   children: [
//     <SegmentedControlOption
//       key="json"
//       value="json"
//       glyph={<Icon glyph="CurlyBraces" />}
//     >
//       JSON and more
//     </SegmentedControlOption>,
//     <SegmentedControlOption key="xml" value="xml" glyph={<Icon glyph="Code" />}>
//       XML
//     </SegmentedControlOption>,
//     <SegmentedControlOption
//       disabled
//       key="shell"
//       value="shell"
//       glyph={<Icon glyph="Shell" />}
//     >
//       Shell
//     </SegmentedControlOption>,
//   ],
// };

// export const IconsOnly = LiveExample.bind({});
// IconsOnly.args = {
//   label: 'Location',
//   name: 'location',
//   children: [
//     <SegmentedControlOption
//       key="cloud"
//       value="cloud"
//       glyph={<Icon glyph="Cloud" />}
//     />,
//     <SegmentedControlOption
//       key="globe"
//       value="globe"
//       glyph={<Icon glyph="GlobeAmericas" />}
//     />,
//     <SegmentedControlOption
//       disabled
//       key="government"
//       value="government"
//       glyph={<Icon glyph="GovernmentBuilding" />}
//     />,
//   ],
// };

export const Generated = () => {};
