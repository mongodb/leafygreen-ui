// eslint-disable-next-line simple-import-sort/imports
import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { type StoryObj } from '@storybook/react';
import {
  expect,
  within,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@storybook/test';

import Button, { Size } from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { RenderMode, TestUtils } from '@leafygreen-ui/popover';
import { BaseFontSize, transitionDuration } from '@leafygreen-ui/tokens';
import { Body, InlineCode, Subtitle } from '@leafygreen-ui/typography';

import Tooltip, { Align, Justify, TooltipProps, TriggerEvent } from '.';

const { getAlign, getJustify } = TestUtils;

const meta: StoryMetaType<typeof Tooltip> = {
  title: 'Composition/Overlays/Tooltip',
  component: Tooltip,
  args: {
    enabled: true,
    renderMode: RenderMode.TopLayer,
    triggerEvent: TriggerEvent.Hover,
    children: 'I am a tooltip!',
  },
  argTypes: {
    open: { control: 'boolean' },
    darkMode: storybookArgTypes.darkMode,
    children: storybookArgTypes.children,
    baseFontSize: {
      control: 'radio',
      options: Object.values(BaseFontSize),
    },
    triggerEvent: {
      control: 'select',
      options: Object.values(TriggerEvent),
    },
  },
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'trigger',
        'shouldClose',
        'onClose',
      ],
    },
    chromatic: {
      delay: transitionDuration.slowest,
    },
    generate: {
      storyNames: ['ShortString', 'LongString', 'JSXChildren'],
      combineArgs: {
        darkMode: [false, true],
        align: Object.values(Align),
        justify: Object.values(Justify),
        baseFontSize: Object.values(BaseFontSize),
      },
      args: {
        open: true,
      },
      decorator: (Instance, ctx) => (
        <div
          className={css`
            width: 256px;
            height: 100px;
            display: flex;
            align-items: ${getAlign(ctx?.args.align, ctx?.args.justify)};
            justify-content: ${getJustify(ctx?.args.align, ctx?.args.justify)};
          `}
        >
          <Instance
            trigger={
              <Button darkMode={ctx?.args.darkMode} size="xsmall">
                trigger
              </Button>
            }
          />
        </div>
      ),
    },
  },
};
export default meta;

export const LiveExample: StoryObj<TooltipProps> = {
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  render: ({ darkMode, ...args }: TooltipProps) => (
    <div
      className={css`
        padding: 100px;
      `}
    >
      <Tooltip
        trigger={<Button size={Size.XSmall}>{args.triggerEvent} me!</Button>}
        darkMode={darkMode}
        {...args}
      />
    </div>
  ),
};

export const Controlled: StoryObj<TooltipProps> = {
  ...LiveExample,
  args: {
    ...LiveExample.args,
    open: true,
  },
};

export const HoverTrigger: StoryObj<TooltipProps> = {
  args: {
    triggerEvent: TriggerEvent.Hover,
  },
  render: LiveExample.render,
  play: async ({ canvasElement, args }) => {
    const trigger = within(canvasElement).getByRole('button');

    userEvent.hover(trigger);

    await waitFor(async () => {
      const tooltip = await within(canvasElement).findByText(
        args.children as string,
      );
      expect(tooltip).toBeVisible();
    });
  },
};

export const HoverTriggerUnhover: StoryObj<TooltipProps> = {
  args: {
    triggerEvent: TriggerEvent.Hover,
  },
  render: LiveExample.render,
  play: async ({ canvasElement, args }) => {
    const trigger = within(canvasElement).getByRole('button');
    let tooltip: HTMLElement;

    userEvent.hover(trigger);

    await waitFor(async () => {
      tooltip = await within(canvasElement).findByText(args.children as string);
      expect(tooltip).toBeVisible();
    });

    await new Promise(resolve => setTimeout(resolve, 333));

    userEvent.unhover(trigger);
    await waitForElementToBeRemoved(tooltip!);
    expect(tooltip!).not.toBeInTheDocument();
  },
};

export const ClickTrigger: StoryObj<TooltipProps> = {
  args: {
    triggerEvent: TriggerEvent.Click,
  },
  render: LiveExample.render,
  play: async ({ canvasElement, args }) => {
    const trigger = within(canvasElement).getByRole('button');

    userEvent.click(trigger);

    await waitFor(async () => {
      const tooltip = await within(canvasElement).findByText(
        args.children as string,
      );
      expect(tooltip).toBeVisible();
    });
  },
};

export const InitialOpen: StoryObj<TooltipProps> = {
  args: {
    enabled: true,
    renderMode: RenderMode.TopLayer,
    trigger: <Button size={Size.XSmall}>Trigger</Button>,
    children: 'I am a tooltip!',
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  render: (args: TooltipProps) => {
    return (
      <div
        className={css`
          padding: 100px;
        `}
      >
        <Tooltip initialOpen {...args} />
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    await waitFor(async () => {
      const tooltip = await within(canvasElement).findByText(
        args.children as string,
      );
      expect(tooltip).toBeVisible();
    });
  },
};

export const WithLeafyGreenChildren: StoryObj<TooltipProps> = {
  ...LiveExample,
  args: {
    initialOpen: true,
    children: (
      <>
        <Subtitle>Example</Subtitle>
        <Body>Use Tooltip in your codebase:</Body>
        <InlineCode>@leafygreen-ui/tooltip</InlineCode>
      </>
    ),
  },
};

export const AlignmentTest: StoryObj<TooltipProps> = {
  render: ({ darkMode, ...args }: TooltipProps) => {
    return (
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(4, 64px);
          grid-template-rows: repeat(4, 64px);
          width: 100%;
          gap: 128px;
          align-items: center;
          justify-items: center;
          justify-content: center;
          padding: 96px;
        `}
      >
        {Object.values(Align).map(a =>
          Object.values(Justify).map(j => (
            <Tooltip
              {...args}
              key={a + j}
              darkMode={darkMode}
              align={a}
              justify={j}
              triggerEvent="click"
              initialOpen
              trigger={<Button size={Size.XSmall} />}
            >
              <Body>{a}</Body>
              <Body>{j}</Body>
            </Tooltip>
          )),
        )}
      </div>
    );
  },
};

const scrollableStyle = css`
  width: 600px;
  height: 80vh;
  background-color: #e8edeb;
  overflow: scroll;
  position: relative;
  scroll-behavior: smooth;
`;

const scrollableInnerStyle = css`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const referenceElPositions: { [key: string]: string } = {
  centered: css`
    position: relative;
  `,
  top: css`
    top: 20px;
    position: absolute;
  `,
  right: css`
    right: 20px;
    position: absolute;
  `,
  bottom: css`
    bottom: 20px;
    position: absolute;
  `,
  left: css`
    left: 20px;
    position: absolute;
  `,
};

type TooltipScrollableProps = TooltipProps & {
  buttonText: string;
  refButtonPosition: string;
};

export const ScrollableContainer: StoryObj<TooltipScrollableProps> = {
  args: {
    children:
      'I am a Tooltip! Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  argTypes: {
    refButtonPosition: {
      options: ['centered', 'top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
      description:
        'Storybook only prop. Used to change position of the reference button',
      defaultValue: 'centered',
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      exclude: [
        'renderMode',
        'portalClassName',
        'refEl',
        'className',
        'active',
        'trigger',
        'triggerEvent',
        'enabled',
        'open',
        'setOpen',
        'children',
        'darkMode',
      ],
    },
  },
  render: ({
    refButtonPosition,
    buttonText,
    justify,
    align,
    ...args
  }: TooltipScrollableProps) => {
    const position = referenceElPositions[refButtonPosition];

    return (
      <div className={scrollableStyle} data-testid="scrollable-container">
        <div className={scrollableInnerStyle}>
          <div className={position}>
            <Tooltip
              trigger={
                <Button size={Size.XSmall} leftGlyph={<Icon glyph="Cloud" />} />
              }
              justify={justify}
              align={align}
              triggerEvent={TriggerEvent.Hover}
              {...args}
            >
              {args.children}
            </Tooltip>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const container = within(canvasElement).getByTestId('scrollable-container');
    const trigger = within(canvasElement).getByRole('button');
    userEvent.click(trigger);
    await waitFor(async () => {
      const tooltip = await within(canvasElement).findByText(
        args.children as string,
      );
      expect(tooltip).toBeVisible();
    });
    container.scrollTo({
      top: 1000,
      left: 0,
    });
  },
};
