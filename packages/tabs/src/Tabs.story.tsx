import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import ExportIcon from '@leafygreen-ui/icon/dist/Export';
import SaveIcon from '@leafygreen-ui/icon/dist/Save';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import {
  storybookExcludedControlParams as defaultExclude,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { Body, Subtitle } from '@leafygreen-ui/typography';

import { Tab, Tabs, TabsProps } from './index';

const meta: StoryMetaType<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    default: 'LongTabs',
    controls: {
      exclude: [...defaultExclude, 'children', 'as', 'setSelected'],
    },
  },
  args: {
    darkMode: false,
    children: [
      <Tab key="Tab 1" default name="Tab 1">
        <Card
          className={css`
            margin: 1em 0;
          `}
        >
          <Subtitle>Tab 1</Subtitle>
          <Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Body>
        </Card>
      </Tab>,
      <Tab key="Tab 2" name="Tab 2">
        <Card
          className={css`
            margin: 1em 0;
          `}
        >
          <Subtitle>Tab 2</Subtitle>
          <Body>
            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Body>
        </Card>
      </Tab>,
      <Tab key="Tab 3" disabled name="Tab 3">
        Tab3
      </Tab>,
    ],
  },
  argTypes: {
    selected: { control: 'number' },
  },
  // TODO: Add subcomponent controls for Tab when supported by Storybook
  // @ts-expect-error
  subcomponents: { tab: Tab },
};
export default meta;

const Template: StoryFn<TabsProps> = ({
  baseFontSize,
  ...props
}: TabsProps) => (
  <LeafyGreenProvider baseFontSize={baseFontSize === 16 ? 16 : 14}>
    <Tabs
      className={css`
        max-width: 66vw;
      `}
      aria-label="Tabs to demonstrate usage of Leafygreen UI Tab Components"
      {...props}
    />
  </LeafyGreenProvider>
);

export const LongTabs = Template.bind({});
LongTabs.args = {
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
};
export const ControlledByStorybook = Template.bind({});
export const ControlledByState = ({
  selected,
  setSelected,
  baseFontSize,
  ...args
}: TabsProps) => {
  const [selectedControl, setSelectedControl] = useState(0);
  return (
    <LeafyGreenProvider baseFontSize={baseFontSize === 16 ? 16 : 14}>
      <Tabs
        selected={selectedControl}
        setSelected={setSelectedControl}
        className={css`
          max-width: 66vw;
        `}
        aria-label="Tabs to demonstrate usage of Leafygreen UI Tab Components"
        {...args}
      />
    </LeafyGreenProvider>
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
