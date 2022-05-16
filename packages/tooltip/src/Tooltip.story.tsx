import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import Tooltip, { Align, Justify, TooltipProps } from '.';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';

export default {
  title: 'Packages/Tooltip',
  component: Tooltip,
  argTypes: {
    darkMode: {
      control: 'boolean',
    },
  },
};

const Template: ComponentStory<typeof Tooltip> = args => (
  <Tooltip trigger={<Button>trigger</Button>} {...args} />
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
