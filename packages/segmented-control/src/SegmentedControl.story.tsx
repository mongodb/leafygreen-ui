import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { SegmentedControl, SegmentedControlOption } from '.';
import Icon from '@leafygreen-ui/icon';
import { SegmentedControlProps } from './SegmentedControl';
import defaultArgTypes from '../../../stories/defaultArgTypes';

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

    darkMode: defaultArgTypes.darkMode,
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
    <SegmentedControlOption key="grape" value="grape">
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
    <SegmentedControlOption key="json" value="json">
      <Icon glyph="CurlyBraces"></Icon> JSON
    </SegmentedControlOption>,
    <SegmentedControlOption key="xml" value="xml">
      <Icon glyph="Code"></Icon> XML
    </SegmentedControlOption>,
    <SegmentedControlOption key="shell" value="shell">
      <Icon glyph="Shell"></Icon> Shell
    </SegmentedControlOption>,
  ],
};

export const IconsOnly = Uncontrolled.bind({});
IconsOnly.args = {
  label: 'Location',
  name: 'location',
  children: [
    <SegmentedControlOption key="cloud" value="cloud">
      <Icon glyph="Cloud" />
    </SegmentedControlOption>,
    <SegmentedControlOption key="globe" value="globe">
      <Icon glyph="GlobeAmericas" />
    </SegmentedControlOption>,
    <SegmentedControlOption key="government" value="government">
      <Icon glyph="GovernmentBuilding" />
    </SegmentedControlOption>,
  ],
};
