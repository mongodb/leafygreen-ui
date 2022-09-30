import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import Card from '@leafygreen-ui/card';
import Button from '@leafygreen-ui/button';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import ExportIcon from '@leafygreen-ui/icon/dist/Export';
import SaveIcon from '@leafygreen-ui/icon/dist/Save';
import { Tab, Tabs } from './index';
import { TabsProps } from './types';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';
import { Story } from '@storybook/react';

// TODO: Add subcomponent controls for Tab when supported by Storybook
export default {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    darkMode: false,
    children: [
      <Tab key="Tab 1" default name="Tab 1">
        <Card>Tab 1 Content</Card>
      </Tab>,
      <Tab
        key="Tab 2"
        name="Tab 2 with a really long name that might overflow and stretch past the width of the Tab"
      >
        <Card>Tab 2 Content</Card>
      </Tab>,
      <Tab key="Tab 3" disabled name="Tab 3">
        <Card>Tab 3 Content</Card>
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
    darkMode: storybookArgTypes.darkMode,
  },
  subcomponents: { Tab },
} as Meta<typeof Tabs>;

const Template: Story<TabsProps> = (props: TabsProps) => (
  <Tabs
    className={css`
      width: 66vw;
    `}
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
  selected: { control: 'none' },
};

export const WithInlineChildren = Template.bind({});
WithInlineChildren.args = {
  inlineChildren: (
    <>
      <IconButton aria-label="export">
        <ExportIcon />
      </IconButton>
      <IconButton aria-label="save">
        <SaveIcon />
      </IconButton>
      <Button>Continue</Button>
    </>
  ),
};
WithInlineChildren.argTypes = {
  inlineChildren: { control: 'none' },
};
