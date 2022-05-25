import React, { useState } from 'react';
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
    margin-bottom: 200vh;
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
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  const position = referenceElPositions[refButtonPosition];

  return (
    <div className={scrollableStyle}>
      <div className={scrollableInnerStyle} ref={el => setPortalContainer(el)}>
        <button
          onClick={() => setActive(active => !active)}
          className={position}
        >
          {buttonText}
          <Popover
            {...args}
            active={active}
            usePortal={true}
            portalContainer={portalContainer}
            scrollContainer={portalContainer}
          >
            <div className={popoverStyle}>Popover content</div>
          </Popover>
        </button>
      </div>
    </div>
  );
};
