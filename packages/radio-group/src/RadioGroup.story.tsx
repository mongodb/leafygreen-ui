import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import { Radio, RadioGroup, RadioGroupProps, Size } from '.';

const meta: StoryMetaType<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    controls: {
      exclude: [...storybookExcludedControlParams, 'children', 'name', 'value'],
    },
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        bold: [false, true],
        size: Object.values(Size),
      },
    },
  },
  args: {
    children: [
      <Radio key="1" checked value="1">
        Radio Input 1
      </Radio>,
      <Radio key="2" default value="2" description="This is a description">
        Radio Input 2
      </Radio>,
      <Radio key="3" disabled value="3" description="This is a description">
        Disabled Option
      </Radio>,
      <Radio key="4" disabled value="4">
        Disabled Option
      </Radio>,
    ],
  },
  argTypes: {
    children: { control: false },
    bold: { control: 'boolean' },
    darkMode: storybookArgTypes.darkMode,
    size: {
      control: 'radio',
      options: Object.values(Size),
    },
  },
};
export default meta;

export const LiveExample: StoryFn<RadioGroupProps> = ({
  children,
  ...args
}: RadioGroupProps) => (
  <RadioGroup name="radio-group-default" {...args}>
    <Radio value="1">Radio Input 1</Radio>
    <Radio default value="2" description="This is a description">
      Radio Input 2
    </Radio>
    <Radio disabled value="3" description="This is a description">
      Disabled Option
    </Radio>
    <Radio disabled value="4">
      Disabled Option
    </Radio>
  </RadioGroup>
);
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Controlled: StoryFn<RadioGroupProps> = (args: RadioGroupProps) => {
  const [activeRadio, setActiveRadio] = useState<string>('1');

  const handleChange = (e: React.ChangeEvent) => {
    setActiveRadio((e.target as HTMLInputElement).value);
  };

  return (
    <RadioGroup {...args} onChange={handleChange} value={activeRadio}>
      <Radio checked={activeRadio === '1'} value="1">
        Radio Input 1
      </Radio>
      <Radio
        checked={activeRadio === '2'}
        value="2"
        description="This is a description"
      >
        Radio Input 2
      </Radio>
      <Radio checked={activeRadio === '3'} disabled value="3">
        Disabled Option
      </Radio>
    </RadioGroup>
  );
};
Controlled.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Generated = () => {};
