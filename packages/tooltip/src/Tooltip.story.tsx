import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import Tooltip, { Align, Justify, TooltipProps } from '.';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes } from '@leafygreen-ui/lib';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    children: 'I am a tooltip!',
  },
  argTypes: {
    open: { control: 'boolean' },
    darkMode: storybookArgTypes.darkMode,
    children: storybookArgTypes.children,
  },
};

const Template: ComponentStory<typeof Tooltip> = ({
  darkMode,
  ...args
}: TooltipProps) => (
  <div
    className={css`
      padding: 100px;
    `}
  >
    <Tooltip
      darkMode={darkMode}
      trigger={<Button darkMode={darkMode}>trigger</Button>}
      {...args}
    />
  </div>
);

export const ControlledWithStorybook = Template.bind({});
export const ControlledWithState = (args: TooltipProps) => {
  const [open, setOpen] = useState(true);
  return <Template {...args} open={open} setOpen={setOpen} />;
};

export const Test = ({ darkMode, ...args }: TooltipProps) => {
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
          <Template
            {...args}
            key={a + j}
            darkMode={darkMode}
            align={a}
            justify={j}
            triggerEvent="click"
          >
            Align {a}, Justify {j}.
          </Template>
        )),
      )}
    </div>
  );
};

export const LongText = Template.bind({});
LongText.args = {
  children:
    '5hhs8d83jj2992h88d9s49ns94jsjsj9456j9djdf95hhs8d83jj2992h88d9s49ns94jsjsj9456j9djdf9',
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

type TooltipScrollableyProps = TooltipProps & {
  buttonText: string;
  refButtonPosition: string;
};

export const ScrollableContainer = ({
  refButtonPosition,
  buttonText,
  justify,
  align,
  ...args
}: TooltipScrollableyProps) => {
  const [portalContainer, setPortalContainer] =
    useState<HTMLDivElement | null>(null);
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
