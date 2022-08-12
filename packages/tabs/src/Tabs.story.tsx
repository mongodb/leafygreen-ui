import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import Icon from '@leafygreen-ui/icon';
import { Tab, Tabs } from './index';
import { TabsProps } from './Tabs';
import defaultArgTypes from '../../../stories/defaultArgTypes';

// TODO: Add subcomponent controls for Tab when supported by Storybook
export default {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    darkMode: false,
    children: [
      <Tab key="Tab 1" default name="Tab 1">
        Tab 1 Content
      </Tab>,
      <Tab
        key="Tab 2"
        name="Tab 2 with a really long name that might overflow and stretch past the width of the Tab"
      >
        Tab 2 Content
      </Tab>,
      <Tab key="Tab 3" disabled name="Tab 3">
        Tab 3 Content
      </Tab>,
      <Tab
        key="Tab 4"
        name={
          <>
            <Icon glyph="Support" /> Tab 4 with an icon in the name
          </>
        }
      >
        Tab 4 Content
      </Tab>,
    ],
  },
  argTypes: {
    children: { control: false },
    as: { control: false },
    setSelected: { control: false },
    selected: { control: 'number' },
    darkMode: defaultArgTypes.darkMode,
  },
  subcomponents: { Tab },
} as Meta<typeof Tabs>;

const Template = (props: TabsProps) => (
  <Tabs
    aria-label="Tabs to demonstrate usage of Leafygreen UI Tab Components"
    {...props}
  />
);

export const ControlledByStorybook = Template.bind({});
export const ControlledByState = ({
  selected,
  setSelected,
  ...args
}: TabsProps) => {
  const [selectedControl, setSelectedControl] = useState(0);
  return (
    <Template
      selected={selectedControl}
      setSelected={setSelectedControl}
      {...args}
    />
  );
};
ControlledByState.argTypes = {
  selected: { control: false },
};
