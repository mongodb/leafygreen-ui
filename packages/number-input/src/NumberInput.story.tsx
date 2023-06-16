import React, { useRef, useState } from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import {
  storybookArgTypes,
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
    default: 'LiveExample',
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
      storyNames: ['Unitless', 'WithUnits', 'WithUnitSelect'],
      combineArgs: {
        darkMode: [false, true],
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
      ],
    },
  },
  args: {
    label: 'Label',
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
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Unitless = () => <></>;
Unitless.args = {
  unit: undefined,
};

export const WithUnits = () => <></>;
WithUnits.args = {
  unit: unitOptions[0].displayName,
  unitOptions: undefined,
};

export const WithUnitSelect = () => <></>;
WithUnitSelect.args = {
  unit: unitOptions[0].displayName,
  unitOptions: unitOptions,
};
