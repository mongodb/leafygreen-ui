import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import RadioBoxGroup, { RadioBoxGroupProps } from './RadioBoxGroup';
import RadioBox from './RadioBox';

export default {
  title: 'Packages/RadioBoxGroup',
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
