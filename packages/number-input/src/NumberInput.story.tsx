import React, { useRef, useState } from 'react';
import { Story } from '@storybook/react';

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
    disabled: false,
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
    unitOptions: {
      control: 'none',
    },
    errorMessage: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
  },
  parameters: {
    default: 'Basic',
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

type StoryProps = NumberInputProps & { view: string };

const Template: Story<StoryProps> = args => {
  const { view, unit: unitProp = 'one', ...rest } = args;
  const [unit, setUnit] = useState<string>(unitOptions[0].displayName);
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
      {...rest}
      ref={inputRef}
      value={value}
      unit={view === 'unitless' ? '' : view === 'unit' ? unitProp : unit}
      unitOptions={view === 'select' ? unitOptions : []}
      onSelectChange={handleSelectChange}
      onChange={handleChange}
      inputClassName={css`
        width: 100px;
      `}
      selectClassName={css`
        max-width: 100px;
      `}
    />
  );
};

export const Basic = Template.bind({});
Basic.argTypes = {
  unit: {
    control: 'none',
  },
  view: {
    control: 'select',
    options: ['unitless', 'unit', 'select'],
    description: '[STORYBOOK ONLY]',
  },
};

export const Unitless = Template.bind({});
Unitless.args = {
  view: 'unitless',
};
Unitless.argTypes = {
  unit: {
    control: 'none',
  },
  view: {
    control: 'none',
  },
};

export const Unit = Template.bind({});
Unit.args = {
  view: 'unit',
};
Unit.argTypes = {
  view: {
    control: 'none',
  },
};

export const Select = Template.bind({});
Select.args = {
  view: 'select',
};
Select.argTypes = {
  unit: {
    control: 'none',
  },
  view: {
    control: 'none',
  },
};

export const Uncontrolled = ({ ...props }: NumberInputProps) => {
  return <NumberInput {...props} />;
};
