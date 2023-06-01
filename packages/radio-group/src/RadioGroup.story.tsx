import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import {
  defaultStorybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import { Radio, RadioGroup, RadioGroupProps, Size } from '.';

const meta: StoryMetaType<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    children: { control: false },
    darkMode: defaultStorybookArgTypes.darkMode,
    size: {
      control: 'radio',
      options: Object.values(Size),
    },
  },
  parameters: {
    controls: {
      exclude: [...storybookExcludedControlParams, 'children', 'name', 'value'],
    },
    default: 'Uncontrolled',
  },
};
export default meta;

export const Uncontrolled: StoryFn<RadioGroupProps> = ({
  darkMode,
  ...args
}: RadioGroupProps) => (
  <RadioGroup name="radio-group-default" darkMode={darkMode} {...args}>
    <Radio value="1">Radio Input Copy</Radio>
    <Radio value="2">Radio Input Copy</Radio>
    <Radio default value="3" description="This is a description">
      Radio Input Copy
    </Radio>
    <Radio disabled value="Selection-4">
      Disabled Option
    </Radio>
  </RadioGroup>
);

export const Controlled: StoryFn<RadioGroupProps> = (args: RadioGroupProps) => {
  const [activeRadio, setActiveRadio] = useState<string>('test1');

  const handleChange = (e: React.ChangeEvent) => {
    setActiveRadio((e.target as HTMLInputElement).value);
  };

  return <Uncontrolled {...args} onChange={handleChange} value={activeRadio} />;
};
