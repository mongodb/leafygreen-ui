import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { SegmentedControl, SegmentedControlOption } from '.';
import Icon from '@leafygreen-ui/icon';

export default {
  title: 'Packages/SegmentedControl',
  component: SegmentedControl,
  argTypes: {
    className: {
      type: 'string',
    },
    children: {
      control: false,
    },
    darkMode: {
      control: 'boolean',
    },
  },
} as Meta<typeof SegmentedControl>;


export const Uncontrolled = ({ children, ...args }) => (
  <LeafygreenProvider>
    <SegmentedControl
      {...args}
    >
      {children}
    </SegmentedControl>
  </LeafygreenProvider>
)
Uncontrolled.args = {
  label: 'Fruit',
  name: 'fruit',
  children: [
    <SegmentedControlOption value="dragonfruit">
        Dragonfruit
      </SegmentedControlOption>,
      <SegmentedControlOption value="eggplant">
        Eggplant
      </SegmentedControlOption>,
      <SegmentedControlOption value="fig">Fig</SegmentedControlOption>,
      <SegmentedControlOption value="grape">Grape</SegmentedControlOption>,
  ],
}

export const Controlled = (args) => {
  const [selectedFruit, setSelectedFruit] = useState('eggplant');
  return <Uncontrolled 
    {...args}  
    value={selectedFruit}
    onChange={setSelectedFruit}
  />
}
Controlled.args = {
  label: 'Fruit',
  name: 'fruit',
  children: [
    <SegmentedControlOption value="dragonfruit">
        Dragonfruit
      </SegmentedControlOption>,
      <SegmentedControlOption value="eggplant">
        Eggplant
      </SegmentedControlOption>,
      <SegmentedControlOption value="fig">Fig</SegmentedControlOption>,
      <SegmentedControlOption value="grape">Grape</SegmentedControlOption>,
  ],
}

export const WithIcons = Uncontrolled.bind({})
WithIcons.args = {
  label: 'View as',
  name: 'language',
  children: [
    <SegmentedControlOption value="json">
      <Icon glyph="CurlyBraces"></Icon> JSON
   </SegmentedControlOption>,
    <SegmentedControlOption value="xml">
      <Icon glyph="Code"></Icon> XML
    </SegmentedControlOption>,
    <SegmentedControlOption value="shell">
      <Icon glyph="Shell"></Icon> Shell
    </SegmentedControlOption>,
  ],
}

export const IconsOnly = Uncontrolled.bind({})
IconsOnly.args = {
  label: 'Location',
  name: 'location',
  children: [
    <SegmentedControlOption value="cloud">
      <Icon glyph="Cloud" />
   </SegmentedControlOption>,
    <SegmentedControlOption value="globe">
      <Icon glyph="GlobeAmericas" />
    </SegmentedControlOption>,
    <SegmentedControlOption value="government">
      <Icon glyph="GovernmentBuilding" />
    </SegmentedControlOption>,
  ],
}