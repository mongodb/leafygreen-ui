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
    displayName: 'Hours',
    value: 'hours',
  },
  {
    displayName: 'Days',
    value: 'days',
  },
  {
    displayName: 'Months',
    value: 'months',
  },
  {
    displayName: 'Astronomical units',
    value: 'au',
  },
];

const meta: StoryMetaType<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
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
    generate: {
      props: {
        darkMode: [false, true],
        unit: [undefined, unitOptions[0].displayName],
        unitOptions: [undefined, unitOptions],
        size: Object.values(Size),
        label: ['Label', undefined],
        description: ['Description', undefined],
        state: Object.values(State).reverse(),
        errorMessage: [undefined, 'Error message'],
        disabled: [false, true],
      },
      excludeCombinations: [
        {
          label: undefined,
          description: 'Description',
        },
        {
          state: State.None,
          errorMessage: 'Error message',
        },
        {
          unit: undefined,
          unitOptions: unitOptions,
        },
      ],
    },
  },
  args: {
    label: 'Label',
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
    // unitOptions: {
    //   control: 'none',
    // },
    errorMessage: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    withOptions: {
      control: 'boolean',
    },
  },
};
export default meta;

type StoryNumberInputProps = NumberInputProps;

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

export const LiveExample = Template.bind({});
LiveExample.args = {
  unitOptions: unitOptions,
  unit: unitOptions[0].displayName,
};

// export const Unitless = Template.bind({});
// Unitless.args = {
//   unitOptions: [],
//   unit: '',
// };
// Unitless.argTypes = {
//   unit: {
//     control: 'none',
//   },
// };

// export const Unit = Template.bind({});
// Unit.args = {
//   unitOptions: [],
//   unit: 'day',
// };
// Unit.argTypes = {};

// export const Select = Template.bind({});
// Select.args = {
//   unitOptions: unitOptions,
//   unit: unitOptions[0].displayName,
// };
// Select.argTypes = {
//   unit: {
//     control: 'none',
//   },
//   unitOptions: {
//     control: 'object',
//   },
// };

// export const Uncontrolled = ({ ...props }: NumberInputProps) => {
//   return <NumberInput {...props} />;
// };

export const Generated = () => {};
