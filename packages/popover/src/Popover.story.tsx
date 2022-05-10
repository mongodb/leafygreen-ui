import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Popover, { Align, Justify } from '.';

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
  height: 200vh;
  padding-top: 50vh;
`;

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
  },
} as Meta<typeof Popover>;

const Template = ({ buttonText, ...args }) => {
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

export const Basic = Template.bind({});

export const ScrollableContainer = args => (
  <div className={scrollableStyle}>
    <Template {...args} />
  </div>
);
