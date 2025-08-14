/* eslint-disable no-console */
import React, { useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import SparkleIcon from '@leafygreen-ui/icon/dist/Sparkle';
import IconButton from '@leafygreen-ui/icon-button';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  color,
  FontWeight,
  spacing,
} from '@leafygreen-ui/tokens';
import { Body, Subtitle } from '@leafygreen-ui/typography';

import { Size } from './Drawer/Drawer.types';
import { DisplayMode, Drawer, DrawerProps } from './Drawer';
import { DrawerLayout } from './DrawerLayout';
import { DrawerStackProvider } from './DrawerStackContext';

const SEED = 0;
faker.seed(SEED);

const defaultExcludedControls = [
  ...storybookExcludedControlParams,
  'children',
  'open',
];

const snapshotStoryExcludedControlParams = [
  ...defaultExcludedControls,
  'darkMode',
  'displayMode',
  'title',
];

const DrawerCustomTitle = () => {
  return (
    <div
      className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <Body
        as="h2"
        baseFontSize={BaseFontSize.Body2}
        weight={FontWeight.SemiBold}
      >
        Custom title
      </Body>
      <div
        className={css`
          display: flex;
        `}
      >
        <IconButton
          aria-label="Go to sleep"
          onClick={() => console.log('cloud click')}
        >
          <CloudIcon />
        </IconButton>
        <IconButton
          aria-label="Make it sparkle"
          onClick={() => console.log('sparkle click')}
        >
          <SparkleIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default {
  title: 'Sections/Drawer',
  component: Drawer,
  decorators: [
    (StoryFn, ctx) => (
      <div
        className={css`
          height: 100%;
          display: flex;
          align-items: center;
          margin: -100px;
          width: 100vw;
          border: 1px solid
            ${color[ctx?.args?.darkMode ? Theme.Dark : Theme.Light].border
              .secondary.default};
        `}
      >
        <StoryFn />
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: defaultExcludedControls,
    },
  },
  args: {
    displayMode: DisplayMode.Overlay,
    title: 'Drawer Title',
    onClose: undefined,
    resizable: true,
    size: Size.Default,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    displayMode: {
      control: 'radio',
      description: 'Options to control how the drawer element is displayed',
      options: Object.values(DisplayMode),
    },
    title: {
      control: 'text',
      description: 'Title of the Drawer',
    },
    resizable: {
      control: 'boolean',
      description:
        'Determines if the Drawer is resizable. Only applies to Embedded display mode.',
    },
    size: {
      control: 'radio',
      description: 'Size of the drawer',
      options: Object.values(Size),
    },
  },
} satisfies StoryMetaType<typeof Drawer>;

const LongContent = () => {
  const paragraphs = useMemo(() => {
    return faker.lorem
      .paragraphs(30, '\n')
      .split('\n')
      .map((p, i) => <Body key={i}>{p}</Body>);
  }, []);

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${spacing[100]}px;
      `}
    >
      {paragraphs}
    </div>
  );
};

type DrawerOmitOpen = Omit<DrawerProps, 'open' | 'onClose'>;
type StoryDrawerProps = DrawerOmitOpen & { resizable?: boolean };

const TemplateComponent: StoryFn<StoryDrawerProps> = ({
  displayMode = DisplayMode.Overlay,
  initialOpen,
  resizable,
  size,
  ...rest
}: StoryDrawerProps & {
  initialOpen?: boolean;
}) => {
  const [open, setOpen] = useState(initialOpen ?? true);

  const renderTrigger = () => (
    <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
      Toggle Drawer
    </Button>
  );

  const isEmbedded = displayMode === DisplayMode.Embedded;

  const baseLayoutProps = {
    drawer: <Drawer {...rest} />,
    onClose: () => setOpen(false),
    isDrawerOpen: open,
    size,
  };

  const layoutProps = isEmbedded
    ? {
        displayMode,
        resizable,
        ...baseLayoutProps,
      }
    : {
        displayMode,
        ...baseLayoutProps,
      };

  return (
    <div
      className={css`
        height: 500px;
        width: 100%;
      `}
    >
      <DrawerLayout {...layoutProps}>
        <main
          className={css`
            padding: ${spacing[400]}px;
            overflow: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: ${spacing[200]}px;
          `}
        >
          {renderTrigger()}
          <LongContent />
        </main>
      </DrawerLayout>
    </div>
  );
};

export const LiveExample: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      exclude: [...defaultExcludedControls, 'initialOpen'],
    },
  },
};

const MultipleDrawersComponent: StoryFn<DrawerProps> = (args: DrawerProps) => {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openC, setOpenC] = useState(false);

  return (
    <DrawerLayout
      displayMode={DisplayMode.Overlay}
      isDrawerOpen={openA || openB || openC}
      className={css`
        height: 500px;
      `}
    >
      <DrawerStackProvider>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            gap: ${spacing[400]}px;
          `}
        >
          <Button onClick={() => setOpenA(prevOpen => !prevOpen)}>
            Toggle Drawer A
          </Button>
          <Button onClick={() => setOpenB(prevOpen => !prevOpen)}>
            Toggle Drawer B
          </Button>
        </div>
        <div>
          <Drawer
            {...args}
            open={openA}
            onClose={() => setOpenA(false)}
            title="Drawer A"
          >
            <LongContent />
          </Drawer>
          <Drawer
            {...args}
            open={openB}
            onClose={() => setOpenB(false)}
            title="Drawer B"
          >
            <Button onClick={() => setOpenC(prevOpen => !prevOpen)}>
              Toggle Drawer C
            </Button>
            <LongContent />
          </Drawer>
          <Drawer
            {...args}
            open={openC}
            onClose={() => setOpenC(false)}
            title="Drawer C"
          >
            <LongContent />
          </Drawer>
        </div>
      </DrawerStackProvider>
    </DrawerLayout>
  );
};

export const MultipleDrawers: StoryObj<DrawerProps> = {
  render: MultipleDrawersComponent,
  args: {
    displayMode: DisplayMode.Overlay,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      exclude: defaultExcludedControls,
    },
  },
};

export const LightModeOverlay: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
    darkMode: false,
    displayMode: DisplayMode.Overlay,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};

export const DarkModeOverlay: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
    darkMode: true,
    displayMode: DisplayMode.Overlay,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};

export const LightModeEmbedded: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
    darkMode: false,
    displayMode: DisplayMode.Embedded,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};

export const DarkModeEmbedded: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
    darkMode: true,
    displayMode: DisplayMode.Embedded,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};

export const Large: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
    darkMode: true,
    displayMode: DisplayMode.Embedded,
    size: Size.Large,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};

export const Default: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
    darkMode: true,
    displayMode: DisplayMode.Embedded,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};

const fullWidthHeightContentStyles = css`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${palette.green.light1},
    ${palette.green.dark1}
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FullWidthHeightContent = () => (
  <div className={fullWidthHeightContentStyles}>
    <Subtitle>Full Width/Height Content</Subtitle>
  </div>
);

export const ScrollableTrue: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
    scrollable: true,
    open: true,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};

export const ScrollableFalse: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <FullWidthHeightContent />,
    scrollable: false,
    open: true,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};

export const CustomTitle: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
    title: <DrawerCustomTitle />,
    open: true,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};
