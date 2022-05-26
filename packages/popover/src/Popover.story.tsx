import React, { useRef, useState } from 'react';
import { Meta } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Popover, { Align, Justify, PopoverProps } from '.';

const popoverStyle = css`
  border: 1px solid ${uiColors.gray.light1};
  text-align: center;
  padding: 20px;
  max-height: 100%;
  overflow: hidden;
  // Reset these properties since they'll be inherited
  // from the container element when not using a portal.
  font-size: initial;
  color: initial;
  background-color: initial;
`;

const scrollableStyle = css`
  width: 500px;
  height: 90vh;
  background-color: #e8edeb;
  overflow: scroll;
`;

const scrollableInnerStyle = css`
  position: relative;
  height: 130vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const buttonStyles = css`
  position: relative;
`;

const referenceElPositions: { [key: string]: string } = {
  centered: css`
    position: relative;
  `,
  top: css`
    top: 0;
    position: absolute;
  `,
  right: css`
    right: 0;
    position: absolute;
  `,
  bottom: css`
    bottom: 0;
    position: absolute;
  `,
  left: css`
    left: 0;
    position: absolute;
  `,
};

export default {
  title: 'Packages/Popover',
  component: Popover,
  args: {
    align: Align.Top,
    justify: Justify.Start,
    usePortal: true,
    spacing: 10,
    adjustOnMutation: false,
    buttonText: 'Button Text',
  },
  argTypes: {
    className: {
      type: 'string',
    },
    children: {
      control: false,
    },
    refButtonPosition: {
      options: ['centered', 'top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof Popover>;

type PopoverStoryProps = PopoverProps & { buttonText: string } & {
  refButtonPosition: string;
};

export const Template = ({ buttonText, ...args }: PopoverStoryProps) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <button
      className={buttonStyles}
      onClick={() => setActive(active => !active)}
    >
      {buttonText}
      <Popover {...args} active={active}>
        <div className={popoverStyle}>Popover content</div>
      </Popover>
    </button>
  );
};

export const ScrollableContainer = ({
  refButtonPosition,
  buttonText,
  ...args
}: PopoverStoryProps) => {
  const [active, setActive] = useState<boolean>(false);
  const portalContainer = useRef<HTMLDivElement | null>(null);

  const position = referenceElPositions[refButtonPosition];

  return (
    <div className={scrollableStyle}>
      <div className={scrollableInnerStyle} ref={portalContainer}>
        <button
          onClick={() => setActive(active => !active)}
          className={position}
        >
          {buttonText}
          <Popover
            {...args}
            active={active}
            usePortal={true}
            portalContainer={portalContainer.current}
            scrollContainer={portalContainer.current}
          >
            <div className={popoverStyle}>Popover content</div>
          </Popover>
        </button>
      </div>
    </div>
  );
};

ScrollableContainer.argTypes = {
  usePortal: { control: 'none' },
  portalClassName: { control: 'none' },
  refEl: { control: 'none' },
  className: { control: 'none' },
  active: { control: 'none' },
};
