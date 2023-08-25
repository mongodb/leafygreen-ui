/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button, { Size } from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { TestUtils } from '@leafygreen-ui/popover';
import { BaseFontSize, transitionDuration } from '@leafygreen-ui/tokens';
import { Body, InlineCode, Subtitle } from '@leafygreen-ui/typography';

import Tooltip, { Align, Justify, TooltipProps } from '.';

const { getAlign, getJustify } = TestUtils;

const longText =
  '5hhs8d83jj2992h88d9s49ns94jsjsj9456j9djdf95hhs8d83jj2992h88d9s49ns94jsjsj9456j9djdf9';

const meta: StoryMetaType<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'trigger'],
    },
    chromatic: {
      delay: transitionDuration.slowest,
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        align: Object.values(Align),
        justify: Object.values(Justify),
        baseFontSize: Object.values(BaseFontSize),
        children: [
          'I am a tooltip!',
          longText,
          // eslint-disable-next-line react/jsx-key
          <InlineCode>@leafygreen-ui/tooltip</InlineCode>,
        ],
      },
      excludeCombinations: [
        {
          justify: Justify.Fit,
          children: longText,
        },
        {
          justify: Justify.Fit,
          align: [Align.Left, Align.Right],
        },
      ],
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
  args: {
    enabled: true,
    usePortal: true,
    trigger: <Button size={Size.XSmall}>Trigger</Button>,
  },
  argTypes: {
    open: { control: 'boolean' },
    darkMode: storybookArgTypes.darkMode,
    children: storybookArgTypes.children,
    baseFontSize: {
      control: 'radio',
      options: Object.values(BaseFontSize),
    },
  },
};
export default meta;

export const LiveExample: StoryFn<TooltipProps> = ({
  darkMode,
  ...args
}: TooltipProps) => (
  <div
    className={css`
      padding: 100px;
    `}
  >
    <Tooltip darkMode={darkMode} {...args} />
  </div>
);
LiveExample.args = {
  children: 'I am a tooltip!',
};
LiveExample.argTypes = {
  open: {
    control: 'none',
  },
};
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const ControlledWithState = (args: TooltipProps) => {
  const [open, setOpen] = useState(true);
  return <Tooltip {...args} open={open} setOpen={setOpen} />;
};
ControlledWithState.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const WithLeafyGreenChildren = LiveExample.bind({});
WithLeafyGreenChildren.args = {
  children: (
    <>
      <Subtitle>Example</Subtitle>
      <Body>Use Tooltip in your codebase:</Body>
      <InlineCode>@leafygreen-ui/tooltip</InlineCode>
    </>
  ),
};

WithLeafyGreenChildren.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const AlignmentTest = ({ darkMode, ...args }: TooltipProps) => {
  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: repeat(4, 64px);
        grid-template-rows: repeat(4, 64px);
        width: 100%;
        gap: 64px;
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
          >
            Align {a}, Justify {j}.
          </Tooltip>
        )),
      )}
    </div>
  );
};
AlignmentTest.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

const scrollableStyle = css`
  width: 600px;
  height: 80vh;
  background-color: #e8edeb;
  overflow: scroll;
  position: relative;
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

export const ScrollableContainer = ({
  refButtonPosition,
  buttonText,
  justify,
  align,
  ...args
}: TooltipScrollableProps) => {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const position = referenceElPositions[refButtonPosition];

  return (
    <div className={scrollableStyle}>
      <div className={scrollableInnerStyle} ref={el => setPortalContainer(el)}>
        <div className={position}>
          <Tooltip
            trigger={
              <span>
                <Icon glyph="Cloud" />
              </span>
            }
            portalContainer={portalContainer}
            scrollContainer={portalContainer}
            triggerEvent="click"
            justify={justify}
            align={align}
            {...args}
          >
            I am a Tooltip! Lorem ipsum dolor sit amet, consectetur adipiscing
            elit
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
ScrollableContainer.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

ScrollableContainer.args = {
  usePortal: true,
};

ScrollableContainer.argTypes = {
  refButtonPosition: {
    options: ['centered', 'top', 'right', 'bottom', 'left'],
    control: { type: 'select' },
    description:
      'Storybook only prop. Used to change position of the reference button',
    defaultValue: 'centered',
  },
  usePortal: { control: 'none' },
  portalClassName: { control: 'none' },
  refEl: { control: 'none' },
  className: { control: 'none' },
  active: { control: 'none' },
  trigger: { control: 'none' },
  triggerEvent: { control: 'none' },
  enabled: { control: 'none' },
  open: { control: 'none' },
  setOpen: { control: 'none' },
  children: { control: 'none' },
  darkMode: { control: 'none' },
};

export const Generated = () => {};
