import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { Radio, RadioGroup } from '.';
import { RadioGroupProps } from './RadioGroup';
import defaultArgTypes from '../../../stories/defaultArgTypes';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    children: { control: false },
    darkMode: defaultArgTypes.darkMode,
    onChange: { control: false },
    name: { control: 'text' },
    value: { control: 'text' },
  },
} as Meta<typeof RadioGroup>;

export const Uncontrolled = ({ darkMode, ...args }: RadioGroupProps) => (
  <RadioGroup name="radio-group-default" darkMode={darkMode} {...args}>
    <Radio value="1">Radio Input Copy</Radio>
    <Radio value="2">Radio Input Copy</Radio>
    <Radio default value="3">
      Radio Input Copy
    </Radio>
    <Radio disabled value="Selection-4">
      Disabled Option
    </Radio>
  </RadioGroup>
);

export const Controlled = (args: RadioGroupProps) => {
  const [activeRadio, setActiveRadio] = useState<string>('test1');

  const handleChange = (e: React.ChangeEvent) => {
    setActiveRadio((e.target as HTMLInputElement).value);
  };

  return <Uncontrolled {...args} onChange={handleChange} value={activeRadio} />;
};
