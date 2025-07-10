import React, { useEffect, useState } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import ExportIcon from '@leafygreen-ui/icon/dist/Export';
import SaveIcon from '@leafygreen-ui/icon/dist/Save';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import Tooltip from '@leafygreen-ui/tooltip';
import { Body, Subtitle } from '@leafygreen-ui/typography';

import { Size, Tab, Tabs, TabsProps } from './';

const CardWithMargin = (props: any) => (
  <Card
    {...props}
    className={css`
      margin: 1em;
    `}
  />
);

const Lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla.`;

const defaultExcludedControls = [
  ...storybookExcludedControlParams,
  'children',
  'onValueChange',
];

const meta: StoryMetaType<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        baseFontSize: [BaseFontSize.Body1, BaseFontSize.Body2],
        darkMode: [false, true],
        size: [Size.Small, Size.Default],
      },
      excludeCombinations: [
        { baseFontSize: BaseFontSize.Body2, size: Size.Small },
      ],
    },
    controls: {
      exclude: defaultExcludedControls,
    },
  },
  args: {
    as: 'button',
    darkMode: false,
    children: [
      <Tab key="Tab 1" default name="Tab 1">
        <CardWithMargin>
          <Subtitle>Tab 1 Content</Subtitle>
          <Body>{Lipsum}</Body>
        </CardWithMargin>
      </Tab>,
      <Tab
        key="Tab 2"
        name="Tab 2 with a really long name that might overflow and stretch past the width of the Tab"
      >
        <CardWithMargin>
          <Subtitle>Tab 2 Content</Subtitle>
          <Body>{Lipsum}</Body>
        </CardWithMargin>
      </Tab>,
      <Tab key="Tab 3" disabled name="Tab 3">
        <CardWithMargin>
          <Subtitle>Tab 3 Content</Subtitle>
          <Body>{Lipsum}</Body>
        </CardWithMargin>
      </Tab>,
      <Tab
        key="Tab 4"
        name={
          <>
            <Icon glyph="Support" /> Tab 4 with an icon in the name
          </>
        }
      >
        <CardWithMargin>
          <Subtitle>Tab 4 Content</Subtitle>
          <Body>{Lipsum}</Body>
        </CardWithMargin>
      </Tab>,
    ],
    forceRenderAllTabPanels: false,
  },
  argTypes: {
    as: storybookArgTypes.as,
    baseFontSize: storybookArgTypes.baseFontSize,
    forceRenderAllTabPanels: { control: 'boolean' },
    value: { control: 'number' },
    size: {
      control: 'radio',
      description:
        "The size of the title. `size='small'` overrides `baseFontSize` to be `BaseFontSize.Body1`",
      options: [Size.Small, Size.Default],
    },
  },
};
export default meta;

export const LiveExample: StoryFn<TabsProps<string>> = ({
  baseFontSize,
  ...props
}: TabsProps<string>) => (
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

export const Controlled: StoryFn<TabsProps<string>> = (
  args: TabsProps<string>,
) => {
  const [selectedTab, setSelectedTab] = useState(
    'Tab 4 with an icon in the name',
  );

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ selectedTab });
  }, [selectedTab]);

  return (
    <div>
      <Button
        onClick={() =>
          setSelectedTab(
            'Tab 2 with a really long name that might overflow and stretch past the width of the Tab',
          )
        }
      >
        Set second tab as active
      </Button>
      <br></br>
      <LiveExample
        {...args}
        value={selectedTab}
        onValueChange={setSelectedTab}
      />
    </div>
  );
};
Controlled.parameters = {
  chromatic: { disableSnapshot: true },
  controls: {
    exclude: [...defaultExcludedControls, 'value'],
  },
};

export const WithInlineChildren = LiveExample.bind({});
WithInlineChildren.args = {
  inlineChildren: (
    <>
      <IconButton aria-label="export">
        <ExportIcon />
      </IconButton>
      <IconButton aria-label="save">
        <SaveIcon />
      </IconButton>
      <Button variant="primary" size="small">
        Continue
      </Button>
    </>
  ),
};
WithInlineChildren.parameters = {
  controls: {
    exclude: [...defaultExcludedControls, 'inlineChildren'],
  },
};

export const WithTooltip: StoryFn<TabsProps<string>> = ({
  baseFontSize,
  ...props
}: TabsProps<string>) => (
  <LeafyGreenProvider baseFontSize={baseFontSize === 16 ? 16 : 14}>
    <Tabs
      className={css`
        max-width: 66vw;
      `}
      aria-label="Tabs example with Tooltip"
      {...props}
    >
      <Tab key="Tab 1" name="Tab 1">
        <CardWithMargin>
          <Subtitle>Tab 1 Content</Subtitle>
          <Body>{Lipsum}</Body>
        </CardWithMargin>
      </Tab>
      <Tab
        key="Tab 2"
        name={
          <Tooltip justify="middle" trigger={<div>Tab 2</div>}>
            I am a tooltip!
          </Tooltip>
        }
        disabled
      >
        <CardWithMargin>
          <Subtitle>Tab 2 Content</Subtitle>
          <Body>{Lipsum}</Body>
        </CardWithMargin>
      </Tab>
      <Tab key="Tab 3" name="Tab 3">
        <CardWithMargin>
          <Subtitle>Tab 3 Content</Subtitle>
          <Body>{Lipsum}</Body>
        </CardWithMargin>
      </Tab>
    </Tabs>
  </LeafyGreenProvider>
);
WithTooltip.parameters = {
  chromatic: { disableSnapshot: true },
  controls: {
    exclude: [
      ...defaultExcludedControls,
      'as',
      'forceRenderAllTabPanels',
      'selected',
    ],
  },
};

export const Generated = () => {};
