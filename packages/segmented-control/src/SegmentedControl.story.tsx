import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import Icon from '@leafygreen-ui/icon';
import { storybookArgTypes } from '@leafygreen-ui/lib';

import { SegmentedControlProps, Size } from './SegmentedControl/types';
import { SegmentedControl, SegmentedControlOption } from '.';

export default {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  argTypes: {
    children: { control: false },
    label: { control: 'text' },
    name: { control: 'text' },
    defaultValue: { control: 'text' },
    value: { control: 'text' },
    followFocus: { control: 'boolean' },
    'aria-controls': { control: 'text' },
    size: {
      control: {
        type: 'radio',
        options: Object.values(Size),
      },
    },
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    controls: {
      exclude: [
        'aria-controls',
        'className',
        'children',
        'onChange',
        'value',
        'defaultValue',
      ],
    },
  },
} as Meta<typeof SegmentedControl>;

export const Uncontrolled = (args: SegmentedControlProps) => (
  <SegmentedControl {...args} />
);
Uncontrolled.args = {
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

export const Controlled = (args: SegmentedControlProps) => {
  const [selectedFruit, setSelectedFruit] = useState('eggplant');
  return (
    <Uncontrolled
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
};

export const WithIcons = Uncontrolled.bind({});
WithIcons.args = {
  label: 'View as',
  name: 'language',
  children: [
    <SegmentedControlOption
      key="json"
      value="json"
      glyph={<Icon glyph="CurlyBraces" />}
    >
      JSONNNNN and more
    </SegmentedControlOption>,
    <SegmentedControlOption key="xml" value="xml" glyph={<Icon glyph="Code" />}>
      XML
    </SegmentedControlOption>,
    <SegmentedControlOption
      disabled
      key="shell"
      value="shell"
      glyph={<Icon glyph="Shell" />}
    >
      Shell
    </SegmentedControlOption>,
  ],
};

export const IconsOnly = Uncontrolled.bind({});
IconsOnly.args = {
  label: 'Location',
  name: 'location',
  children: [
    <SegmentedControlOption
      key="cloud"
      value="cloud"
      glyph={<Icon glyph="Cloud" />}
    />,
    <SegmentedControlOption
      key="globe"
      value="globe"
      glyph={<Icon glyph="GlobeAmericas" />}
    />,
    <SegmentedControlOption
      disabled
      key="government"
      value="government"
      glyph={<Icon glyph="GovernmentBuilding" />}
    />,
  ],
};
