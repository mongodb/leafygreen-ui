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
  position: relative;
  height: 90vh;
`;

interface RefPos {
  [key: string]: string;
}

const referenceElPositions: RefPos = {
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

type PopoverStoryProps = PopoverProps & { buttonText: string } & { refButtonPosition: string};

export const Template = ({ buttonText, ...args }: PopoverStoryProps) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <button onClick={() => setActive(active => !active)}>
      {buttonText}
      <Popover {...args} active={active}>
        <div className={popoverStyle}>Popover content</div>
      </Popover>
    </button>
  );
};

// export const Basic = Template.bind({});

// export const ScrollableContainer = (args: PopoverStoryProps) => {
//   const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
//     null,
//   );
//   return (
//     <div className={scrollableStyle}>
//       <Template {...args} />
//     </div>
//   );

// }

export const ScrollableContainer = ({ refButtonPosition, buttonText, ...args }: PopoverStoryProps) => {
  const [active, setActive] = useState<boolean>(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  const position = referenceElPositions[refButtonPosition];

  return (
    <div className={scrollableStyle} ref={el => setPortalContainer(el)} >
      <button onClick={() => setActive(active => !active)} className={position}>
        {buttonText}
        <Popover {...args} active={active} usePortal={true} portalContainer={portalContainer}
          scrollContainer={portalContainer}>
          <div className={popoverStyle}>Popover content</div>
        </Popover>
      </button>
    </div>
  );
};
