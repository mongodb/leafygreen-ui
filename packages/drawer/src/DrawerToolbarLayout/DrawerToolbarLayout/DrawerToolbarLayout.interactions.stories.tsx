import React from 'react';
import { storybookExcludedControlParams } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { DisplayMode, Drawer } from '../../Drawer';
import { DrawerLayoutProvider } from '../../DrawerLayout';
import { getTestUtils } from '../../testing';
import { useDrawerToolbarContext } from '../DrawerToolbarContext/DrawerToolbarContext';

import { DrawerToolbarLayout } from './DrawerToolbarLayout';
import {
  getDrawerToolbarData,
  LongContent,
  useToolbarData,
} from './DrawerToolbarLayout.testutils';
import { DrawerToolbarLayoutProps } from './DrawerToolbarLayout.types';

const DRAWER_TOOLBAR_DATA = getDrawerToolbarData({ hasStaticContent: true });

// The tooltip sometimes lingers after the drawer closes, which can cause
// snapshot tests to fail if the tooltip is not in the correct position.
// Setting a delay of 1 second allows the tooltip to be in the correct position
const TOOLTIP_SNAPSHOT_DELAY = 1000; // ms

// Reusable play function for testing opening first toolbar item (Code)
const playOpensFirstToolbarItem = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const { getToolbarTestUtils, isOpen } = getTestUtils();
  const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
  const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();

  expect(isOpen()).toBe(false);
  userEvent.click(codeButton!);

  await waitFor(() => {
    expect(isOpen()).toBe(true);
    expect(canvas.getByText('Code Title')).toBeVisible();
  });
  // Pause so the tooltip is in the correct position in the snapshot
  await new Promise(resolve => setTimeout(resolve, TOOLTIP_SNAPSHOT_DELAY));
};

// Reusable play function for testing switching between toolbar items (for Overlay mode)
const playSwitchesToolbarItems = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const { getToolbarTestUtils, getDrawer, isOpen } = getTestUtils();
  const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
  const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
  const dashboardButton =
    getToolbarIconButtonByLabel('Dashboard')?.getElement();

  expect(isOpen()).toBe(false);

  userEvent.click(codeButton!);

  await waitFor(() => {
    expect(isOpen()).toBe(true);
    expect(canvas.getByText('Code Title')).toBeVisible();
  });

  userEvent.unhover(codeButton!);
  userEvent.click(dashboardButton!);

  await waitFor(() => {
    expect(canvas.getByText('Dashboard Title')).toBeVisible();
    expect(getDrawer().textContent).toContain('Dashboard Title');
  });
};

// Reusable play function for testing switching between toolbar items (for Embedded mode)
const playSwitchesToolbarItemsEmbedded = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const { getToolbarTestUtils, isOpen } = getTestUtils();
  const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
  const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
  const dashboardButton =
    getToolbarIconButtonByLabel('Dashboard')?.getElement();

  expect(isOpen()).toBe(false);

  userEvent.click(codeButton!);
  expect(isOpen()).toBe(false);
  await waitFor(() => {
    expect(isOpen()).toBe(true);
    expect(canvas.getByText('Code Title')).toBeVisible();
  });

  userEvent.unhover(codeButton!);
  userEvent.click(dashboardButton!);

  await waitFor(() =>
    expect(canvas.getByText('Dashboard Title')).toBeVisible(),
  );
};

// Reusable play function for testing closing drawer with close button
const playClosesDrawer = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const { getToolbarTestUtils, getCloseButtonUtils, isOpen } = getTestUtils();
  const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
  const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
  const closeButton = getCloseButtonUtils().getButton();

  expect(isOpen()).toBe(false);

  userEvent.click(codeButton!);

  await waitFor(() => {
    expect(isOpen()).toBe(true);
    expect(canvas.getByText('Code Title')).toBeVisible();
  });

  userEvent.click(closeButton!);

  await waitFor(() => expect(isOpen()).toBe(false));
  // Pause so the tooltip is in the correct position in the snapshot
  await new Promise(resolve => setTimeout(resolve, TOOLTIP_SNAPSHOT_DELAY));
};

// Reusable play function for testing toolbar removal when all items are hidden
const playRemovesToolbarWhenAllItemsAreHidden = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const { getToolbarTestUtils, isOpen } = getTestUtils();
  const { getToolbarIconButtonByLabel, queryToolbar } = getToolbarTestUtils();

  // Verify toolbar is initially visible
  const toolbar = queryToolbar();
  expect(toolbar).toBeInTheDocument();

  const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
  expect(codeButton).toBeInTheDocument();

  // Open the drawer
  expect(isOpen()).toBe(false);
  userEvent.click(codeButton!);

  await waitFor(() => {
    expect(isOpen()).toBe(true);
    expect(canvas.getByText('Code Title')).toBeVisible();
  });

  // Click the toggle button to hide toolbar
  const toggleButton = canvas.getByText('Toggle Toolbar visibility');
  userEvent.click(toggleButton);

  // Verify toolbar element is removed but drawer remains open
  await waitFor(() => {
    const hiddenToolbar = queryToolbar();
    expect(hiddenToolbar).not.toBeInTheDocument();
    expect(isOpen()).toBe(true);
    expect(canvas.getByText('Code Title')).toBeVisible();
  });
};

// Reusable play function for testing drawer closure when active item is hidden
const playClosesDrawerWhenActiveItemIsHidden = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const { getToolbarTestUtils, isOpen } = getTestUtils();
  const {
    getToolbarIconButtonByLabel,
    queryToolbar,
    getAllToolbarIconButtons,
  } = getToolbarTestUtils();

  // Verify toolbar is initially visible
  const toolbar = queryToolbar();
  expect(toolbar).toBeInTheDocument();
  expect(getAllToolbarIconButtons().length).toBe(6);

  const activeButton = getToolbarIconButtonByLabel('Apps')?.getElement();
  expect(activeButton).toBeInTheDocument();

  // Open the drawer
  expect(isOpen()).toBe(false);
  userEvent.click(activeButton!);

  await waitFor(() => {
    expect(isOpen()).toBe(true);
    expect(canvas.getByText('Apps Title')).toBeVisible();
  });

  // Click the toggle button to hide 'Apps' item from toolbar
  const toggleButton = canvas.getByText('Toggle Apps Toolbar item');
  userEvent.click(toggleButton);

  // Verify toolbar element is visible but drawer is closed
  await waitFor(() => {
    const hiddenToolbar = queryToolbar();
    expect(hiddenToolbar).toBeInTheDocument();
    expect(isOpen()).toBe(false);
    expect(canvas.getByText('Apps Title')).not.toBeVisible();
    expect(getAllToolbarIconButtons().length).toBe(5);
  });
};

// Reusable play function for testing drawer closure when active item is removed from toolbar data
const playClosesDrawerWhenActiveItemIsRemovedFromToolbarData = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const { getToolbarTestUtils, isOpen } = getTestUtils();
  const {
    getToolbarIconButtonByLabel,
    queryToolbar,
    getAllToolbarIconButtons,
  } = getToolbarTestUtils();

  // Verify toolbar is initially visible
  const toolbar = queryToolbar();
  expect(toolbar).toBeInTheDocument();
  expect(getAllToolbarIconButtons().length).toBe(6);

  const activeButton = getToolbarIconButtonByLabel('Trash')?.getElement();
  expect(activeButton).toBeInTheDocument();

  // Open the drawer
  expect(isOpen()).toBe(false);
  userEvent.click(activeButton!);

  await waitFor(() => {
    expect(isOpen()).toBe(true);
    expect(canvas.getByText('Trash Title')).toBeVisible();
  });

  // Click the toggle button remove 'Trash' item from toolbarData
  const toggleButton = canvas.getByText('Toggle Trash Toolbar item');
  userEvent.click(toggleButton);

  // Verify toolbar element is visible but drawer is closed
  await waitFor(() => {
    const hiddenToolbar = queryToolbar();
    expect(hiddenToolbar).toBeInTheDocument();
    expect(isOpen()).toBe(false);
    expect(canvas.queryByText('Trash Title')).not.toBeInTheDocument();
    expect(getAllToolbarIconButtons().length).toBe(5);
  });
};

// For testing purposes. displayMode is read from the context, so we need to
// pass it down to the DrawerToolbarLayoutProps.
type DrawerToolbarLayoutPropsWithDisplayMode = DrawerToolbarLayoutProps & {
  displayMode?: DisplayMode;
};

const excludedControls = [
  ...storybookExcludedControlParams,
  'children',
  'open',
  'displayMode',
  'title',
];

export default {
  title: 'Sections/Drawer/Toolbar/Interactions',
  component: Drawer,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: excludedControls,
    },
  },
  decorators: [
    (Story: StoryFn) => (
      <div
        className={css`
          height: 100%;
          display: flex;
          align-items: center;
          margin: -100px;
          width: 100vw;
        `}
      >
        <Story />
      </div>
    ),
  ],
};

const Template: StoryFn<DrawerToolbarLayoutPropsWithDisplayMode> = ({
  displayMode = DisplayMode.Embedded,
}: DrawerToolbarLayoutPropsWithDisplayMode) => {
  const MainContent = () => {
    const { openDrawer } = useDrawerToolbarContext();

    return (
      <main
        className={css`
          padding: ${spacing[400]}px;
        `}
      >
        <Button onClick={() => openDrawer('Code')}>Open Code Drawer</Button>
        <LongContent />
        <LongContent />
      </main>
    );
  };

  return (
    <div
      className={css`
        height: 80vh;
        border-bottom: 1px solid ${palette.gray.light1};
        width: 100%;
      `}
    >
      <DrawerLayoutProvider displayMode={displayMode!} hasToolbar>
        <DrawerToolbarLayout toolbarData={DRAWER_TOOLBAR_DATA}>
          <MainContent />
        </DrawerToolbarLayout>
      </DrawerLayoutProvider>
    </div>
  );
};

const TemplateWithToolbarToggle: StoryFn<
  DrawerToolbarLayoutPropsWithDisplayMode
> = ({
  displayMode = DisplayMode.Embedded,
}: DrawerToolbarLayoutPropsWithDisplayMode) => {
  const {
    toolbarData,
    setHasToolbarData,
    setHasHiddenToolbarItem,
    setHasRemovedToolbarItem,
  } = useToolbarData(DRAWER_TOOLBAR_DATA);

  const MainContent = () => {
    const { openDrawer } = useDrawerToolbarContext();

    return (
      <main
        className={css`
          padding: ${spacing[400]}px;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          `}
        >
          <Button onClick={() => openDrawer('Code')}>Open Code Drawer</Button>
          <Button onClick={() => setHasToolbarData(prev => !prev)}>
            Toggle Toolbar visibility
          </Button>
          <Button onClick={() => setHasHiddenToolbarItem(prev => !prev)}>
            Toggle Apps Toolbar item
          </Button>
          <Button onClick={() => setHasRemovedToolbarItem(prev => !prev)}>
            Toggle Trash Toolbar item
          </Button>
        </div>
        <LongContent />
        <LongContent />
      </main>
    );
  };

  return (
    <div
      className={css`
        height: 80vh;
        border-bottom: 1px solid ${palette.gray.light1};
        width: 100%;
      `}
    >
      <DrawerLayoutProvider displayMode={displayMode!} hasToolbar>
        <DrawerToolbarLayout toolbarData={toolbarData}>
          <MainContent />
        </DrawerToolbarLayout>
      </DrawerLayoutProvider>
    </div>
  );
};

export const OverlayOpensFirstToolbarItem: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutProps) => <Template {...args} />,
    args: {
      displayMode: DisplayMode.Overlay,
    },
    play: playOpensFirstToolbarItem,
  };

export const OverlaySwitchesToolbarItems: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <Template {...args} />
    ),
    args: {
      displayMode: DisplayMode.Overlay,
    },
    play: playSwitchesToolbarItems,
  };

export const OverlayClosesDrawer: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <Template {...args} />
    ),
    args: {
      displayMode: DisplayMode.Overlay,
    },
    play: playClosesDrawer,
  };

export const OverlayRemovesToolbarWhenAllItemsAreHidden: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <TemplateWithToolbarToggle {...args} />
    ),
    args: {
      displayMode: DisplayMode.Overlay,
    },
    play: playRemovesToolbarWhenAllItemsAreHidden,
  };

export const OverlayClosesDrawerWhenActiveItemIsHidden: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <TemplateWithToolbarToggle {...args} />
    ),
    args: {
      displayMode: DisplayMode.Overlay,
    },
    play: playClosesDrawerWhenActiveItemIsHidden,
  };

export const OverlayClosesDrawerWhenActiveItemIsRemovedFromToolbarData: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <TemplateWithToolbarToggle {...args} />
    ),
    args: {
      displayMode: DisplayMode.Overlay,
    },
    play: playClosesDrawerWhenActiveItemIsRemovedFromToolbarData,
  };

export const EmbeddedOpensFirstToolbarItem: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <Template {...args} />
    ),
    args: {
      displayMode: DisplayMode.Embedded,
    },
    play: playOpensFirstToolbarItem,
  };

export const EmbeddedSwitchesToolbarItems: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <Template {...args} />
    ),
    args: {
      displayMode: DisplayMode.Embedded,
    },
    play: playSwitchesToolbarItemsEmbedded,
  };

export const EmbeddedClosesDrawer: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <Template {...args} />
    ),
    args: {
      displayMode: DisplayMode.Embedded,
    },
    play: playClosesDrawer,
  };

export const EmbeddedRemovesToolbarWhenAllItemsAreHidden: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <TemplateWithToolbarToggle {...args} />
    ),
    args: {
      displayMode: DisplayMode.Embedded,
    },
    play: playRemovesToolbarWhenAllItemsAreHidden,
  };

export const EmbeddedClosesDrawerWhenActiveItemIsHidden: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <TemplateWithToolbarToggle {...args} />
    ),
    args: {
      displayMode: DisplayMode.Embedded,
    },
    play: playClosesDrawerWhenActiveItemIsHidden,
  };

export const EmbeddedClosesDrawerWhenActiveItemIsRemovedFromToolbarData: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <TemplateWithToolbarToggle {...args} />
    ),
    args: {
      displayMode: DisplayMode.Embedded,
    },
    play: playClosesDrawerWhenActiveItemIsRemovedFromToolbarData,
  };
