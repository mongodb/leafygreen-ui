import React, { useRef, useState } from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import {
  defaultStorybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import { Size, State, UnitOption } from './NumberInput/NumberInput.types';
import { NumberInput, NumberInputProps } from '.';

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

const meta: StoryMetaType<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  args: {
    label: 'label',
    disabled: false,
  },
  argTypes: {
    darkMode: defaultStorybookArgTypes.darkMode,
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
        ...storybookExcludedControlParams,
        'as',
        'children',
        'value',
        'onSelectChange',
      ],
    },
  },
};
export default meta;

type StoryNumberInputProps = NumberInputProps & { view: string };

const Template: StoryFn<StoryNumberInputProps> = (
  args: StoryNumberInputProps,
) => {
  const { unit: unitProp = 'one', unitOptions = [], ...rest } = args;
  const [unit, setUnit] = useState<string>(unitOptions[0]?.displayName);
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
      unit={unitOptions.length ? unit : unitProp}
      unitOptions={unitOptions}
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

// TODO: temp story for .design. For now consumers won't be able to change unit/unitOptions props. We need to figure out a way to make the story friendly to both designers and engineers.
export const Basic = Template.bind({});
Basic.args = {
  unitOptions: unitOptions,
  unit: unitOptions[0].displayName,
};
Basic.argTypes = {
  unit: {
    control: 'none',
  },
};

export const Unitless = Template.bind({});
Unitless.args = {
  unitOptions: [],
  unit: '',
};
Unitless.argTypes = {
  unit: {
    control: 'none',
  },
};

export const Unit = Template.bind({});
Unit.args = {
  unitOptions: [],
  unit: 'day',
};
Unit.argTypes = {};

export const Select = Template.bind({});
Select.args = {
  unitOptions: unitOptions,
  unit: unitOptions[0].displayName,
};
Select.argTypes = {
  unit: {
    control: 'none',
  },
  unitOptions: {
    control: 'object',
  },
};

export const Uncontrolled = ({ ...props }: NumberInputProps) => {
  return <NumberInput {...props} />;
};
