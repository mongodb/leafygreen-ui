import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes, StoryMeta } from '@leafygreen-ui/lib';

import {
  NumberInputProps,
  Size,
  UnitOption,
} from './NumberInput/NumberInput.types';
import { NumberInput } from '.';

export default StoryMeta({
  title: 'Components/NumberInput',
  component: NumberInput,
  args: {
    label: 'label',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    // disabled: {
    //   control: 'boolean',
    // },
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    unit: {
      control: 'text',
    },
    errorMessage: {
      control: 'text',
    },
  },
  parameters: {
    default: 'Demo',
    controls: {
      exclude: [
        'as',
        'children',
        'aria-labelledby',
        'aria-describedby',
        'aria-label',
        'value',
        'onSelectChange',
      ],
    },
  },
});

const Template: ComponentStory<typeof NumberInput> = props => (
  <NumberInput
    className={css`
      input {
        width: 200px;
      }
    `}
    {...props}
  />
);

const unitOptions = [
  {
    displayName: 'OneTwoThreeFourFiveSix',
    value: 'one',
  },
  {
    displayName: 'Two',
    value: 'two',
  },
  {
    displayName: 'Three',
    value: 'three',
  },
  {
    displayName: 'FourFiveSixSeven',
    value: 'four',
  },
];

export const Basic = Template.bind({});

export const Unit = Template.bind({});
Unit.args = {
  unit: 'Month',
};

export const Select = (props: NumberInputProps) => {
  const [unit, setUnit] = useState<UnitOption>(unitOptions[0]);

  const handleSelectChange = (unit: UnitOption) => {
    setUnit(unit);
    // eslint-disable-next-line no-console
    console.log('story: select value', unit?.displayName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    console.log('story: input value: ', e.target.value);
  };

  return (
    <NumberInput
      {...props}
      unit={unit?.displayName}
      unitOptions={unitOptions}
      onSelectChange={handleSelectChange}
      onChange={handleChange}
      className={css`
        max-width: 200px;

        input {
          width: 100px;
        }
      `}
    />
  );
};
