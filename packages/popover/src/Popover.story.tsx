import React, { useRef, useState } from 'react';
import { Meta } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

import Popover, { Align, Justify, PopoverProps } from '.';

const popoverStyle = css`
  border: 1px solid ${palette.gray.light1};
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

const regularStyles = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const scrollableStyle = css`
  width: 500px;
  height: 90vh;
  background-color: ${palette.gray.light2};
  overflow: scroll;
  position: relative;
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
  title: 'Components/Popover',
  component: Popover,
  args: {
    align: Align.Top,
    justify: Justify.Start,
    usePortal: true,
    spacing: 10,
    adjustOnMutation: false,
  },
  argTypes: {
    className: {
      type: 'string',
    },
    children: {
      control: false,
    },
    buttonText: {
      type: 'string',
      description:
        'Storybook only prop. Used to change the reference button text',
      defaultValue: 'Button Text',
    },
    refButtonPosition: {
      options: ['centered', 'top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
      description:
        'Storybook only prop. Used to change position of the reference button',
      defaultValue: 'centered',
    },
  },
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [
        'active',
        'refEl',
        'portalClassName',
        'refButtonPosition',
        'usePortal',
      ],
    },
  },
} as Meta<typeof Popover>;

type PopoverStoryProps = PopoverProps & {
  buttonText: string;
  refButtonPosition: string;
};

export const Basic = ({
  refButtonPosition,
  buttonText,
  ...args
}: PopoverStoryProps) => {
  const [active, setActive] = useState<boolean>(false);

  const position = referenceElPositions[refButtonPosition];

  return (
    <div className={regularStyles}>
      <Button
        className={cx(buttonStyles, position)}
        onClick={() => setActive(active => !active)}
      >
        {buttonText}
        <Popover {...args} active={active}>
          <div className={popoverStyle}>Popover content</div>
        </Popover>
      </Button>
    </div>
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
        <Button
          onClick={() => setActive(active => !active)}
          className={position}
        >
          {buttonText}
          {/* @ts-expect-error */}
          <Popover
            {...args}
            active={active}
            portalContainer={portalContainer.current}
            scrollContainer={portalContainer.current}
          >
            <div className={popoverStyle}>Popover content</div>
          </Popover>
        </Button>
      </div>
    </div>
  );
};

ScrollableContainer.args = {
  usePortal: true,
};

ScrollableContainer.argTypes = {
  usePortal: { control: 'none' },
  portalClassName: { control: 'none' },
  refEl: { control: 'none' },
  className: { control: 'none' },
  active: { control: 'none' },
};
