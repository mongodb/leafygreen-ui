import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import Tooltip from '@leafygreen-ui/tooltip';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { RadioBoxGroup, RadioBox } from '.';
import { RadioBoxGroupProps } from './RadioBoxGroup';

export default {
  title: 'Components/RadioBoxGroup',
  component: RadioBoxGroup,
  argTypes: {
    children: { control: false },
    onChange: { control: false },
    name: { control: 'text' },
    value: { control: 'text' },
  },
} as Meta<typeof RadioBoxGroup>;

export const Uncontrolled = (args: RadioBoxGroupProps) => (
  <LeafyGreenProvider>
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
  </LeafyGreenProvider>
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

export const TooltipTest = () => {
  return (
    <LeafyGreenProvider>
      <RadioBoxGroup>
        <Tooltip
          justify="middle"
          trigger={<RadioBox value="one">One</RadioBox>}
        >
          This one is pretty cool.
        </Tooltip>
        <Tooltip
          justify="middle"
          trigger={<RadioBox value="two">Two</RadioBox>}
        >
          This does a thing.
        </Tooltip>

        <Tooltip
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
    </LeafyGreenProvider>
  );
};
