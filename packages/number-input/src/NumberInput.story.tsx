import React, { useRef, useState } from 'react';
import { ComponentStory } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes, StoryMeta } from '@leafygreen-ui/lib';

import {
  NumberInputProps,
  Size,
  State,
  UnitOption,
} from './NumberInput/NumberInput.types';
import { NumberInput } from '.';

export default StoryMeta({
  title: 'Components/NumberInput',
  component: NumberInput,
  args: {
    label: 'label',
    unitOptions: [],
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    state: {
      control: 'select',
      options: Object.values(State),
    },
    disabled: {
      control: 'boolean',
    },
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
    placeholder: {
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
    displayName: 'One(s)',
    value: 'one',
  },
  {
    displayName: 'Two(s)',
    value: 'two',
  },
  {
    displayName: 'Three(s)',
    value: 'three',
  },
  {
    displayName: 'FourFiveSixSeven(s)',
    value: 'four',
  },
];

export const Basic = Template.bind({});

export const Unit = Template.bind({});
Unit.args = {
  unit: 'Month',
};

export const Select = ({
  unit: unitProp,
  unitOptions,
  ...rest
}: NumberInputProps) => {
  const [unit, setUnit] = useState<string>(unitProp as string);
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectChange = (unit: UnitOption) => {
    setUnit(unit.displayName);
    // eslint-disable-next-line no-console
    console.log('story: select value', unit?.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    console.log('story: event: ', e.target.value);
    // eslint-disable-next-line no-console
    console.log('story: ref', inputRef.current?.value);
    setValue(e.target.value);
  };

  return (
    <NumberInput
      ref={inputRef}
      value={value}
      unit={unit}
      unitOptions={unitOptions as Array<UnitOption>}
      onSelectChange={handleSelectChange}
      onChange={handleChange}
      className={css`
        max-width: 200px;

        input {
          width: 100px;
        }
      `}
      {...rest}
    />
  );
};

Select.args = {
  unit: unitOptions[0].displayName,
  unitOptions: unitOptions,
};
