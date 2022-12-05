import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';
import Tooltip from '@leafygreen-ui/tooltip';

import { RadioBoxGroupProps } from './types';
import { RadioBox, RadioBoxGroup } from '.';

export default {
  title: 'Components/RadioBoxGroup',
  component: RadioBoxGroup,
  argTypes: {
    children: { control: false },
    onChange: { control: false },
    name: { control: 'text' },
    value: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    controls: {
      exclude: ['className', 'children', 'onChange', 'name', 'value'],
    },
  },
} as Meta<typeof RadioBoxGroup>;

export const Uncontrolled = (args: RadioBoxGroupProps) => (
  <RadioBoxGroup name="radio-box-group-default" {...args}>
    <RadioBox value="1">Option One</RadioBox>
    <RadioBox value="2">Option Two</RadioBox>
    <RadioBox default value="3">
      Option Three
    </RadioBox>
    <RadioBox disabled={true} value="option-4">
      Disabled Option
    </RadioBox>
  </RadioBoxGroup>
);

export const Controlled = (args: RadioBoxGroupProps) => {
  const [activeRadioBox, setActiveRadioBox] = useState<string>('test1');

  const handleChange = (e: React.FormEvent) => {
    setActiveRadioBox((e.target as HTMLInputElement).value);
  };

  return (
    <Uncontrolled {...args} onChange={handleChange} value={activeRadioBox} />
  );
};

export const TooltipTest = ({ darkMode }: RadioBoxGroupProps) => {
  return (
    <RadioBoxGroup darkMode={darkMode}>
      <Tooltip
        darkMode={darkMode}
        justify="middle"
        trigger={<RadioBox value="one">One</RadioBox>}
      >
        This one is pretty cool.
      </Tooltip>
      <Tooltip
        darkMode={darkMode}
        justify="middle"
        trigger={<RadioBox value="two">Two</RadioBox>}
      >
        This does a thing.
      </Tooltip>

      <Tooltip
        darkMode={darkMode}
        justify="middle"
        trigger={
          <RadioBox value="three" disabled>
            Three
          </RadioBox>
        }
      >
        This is disabled for a reason.
      </Tooltip>
    </RadioBoxGroup>
  );
};
