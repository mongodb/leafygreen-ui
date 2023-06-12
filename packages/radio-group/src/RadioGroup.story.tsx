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
        size: Object.values(Size),
      },
    },
  },
  args: {
    children: (
      <>
        <Radio checked value="1">
          Radio Input 1
        </Radio>
        <Radio default value="2" description="This is a description">
          Radio Input 2
        </Radio>
        <Radio disabled value="Selection-4">
          Disabled Option
        </Radio>
      </>
    ),
  },
  argTypes: {
    children: { control: false },
    darkMode: storybookArgTypes.darkMode,
    size: {
      control: 'radio',
      options: Object.values(Size),
    },
  },
};
export default meta;

export const LiveExample: StoryFn<RadioGroupProps> = (
  args: RadioGroupProps,
) => <RadioGroup name="radio-group-default" {...args} />;
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Controlled: StoryFn<RadioGroupProps> = (args: RadioGroupProps) => {
  const [activeRadio, setActiveRadio] = useState<string>('test1');

  const handleChange = (e: React.ChangeEvent) => {
    setActiveRadio((e.target as HTMLInputElement).value);
  };

  return <RadioGroup {...args} onChange={handleChange} value={activeRadio} />;
};
Controlled.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Generated = () => {};
