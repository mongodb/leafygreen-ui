import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  type StoryMetaType,
  StoryType,
} from '@leafygreen-ui/lib';

import { getComboboxOptions } from './test-utils/getTestOptions.testutils';
import {
  ComboboxSize,
  Overflow,
  SearchState,
  State,
  TruncationLocation,
} from './Combobox.types';
import { Combobox, ComboboxOption, ComboboxProps } from '.';

const wrapperStyle = css`
  width: 256px;
  padding-block: 64px;
  display: flex;
`;

const multiValue = ['apple', 'banana'];

const meta: StoryMetaType<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  decorators: [
    StoryFn => (
      <div className={wrapperStyle}>
        <StoryFn />
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'as',
        'filteredOptions',
        'initialValue',
        'setError',
        'value',
        'children',
      ],
    },
    generate: {
      storyNames: ['SingleSelect', 'MultiSelect'],
      combineArgs: {
        darkMode: [false, true],
        clearable: [true, false],
        description: [undefined, 'Please pick fruit(s)'],
        label: [undefined, 'Choose a fruit'],
        state: Object.values(State),
        size: Object.values(ComboboxSize),
      },
      excludeCombinations: [
        ['description', { label: undefined }],
        {
          clearable: false,
          value: undefined,
        },
        {
          multiselect: true,
          value: 'apple',
        },
        {
          multiselect: false,
          value: multiValue,
        },
      ],
    },
  },

  args: {
    label: 'Choose a fruit',
    description: 'Please pick fruit(s)',
    placeholder: 'Select fruit',
    multiselect: false,
    darkMode: false,
    disabled: false,
    clearable: true,
    errorMessage: 'No Pomegranates!',
    children: getComboboxOptions(),
  },

  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    multiselect: { control: 'boolean' },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    placeholder: { control: 'text' },
    size: {
      options: Object.values(ComboboxSize),
      control: 'select',
    },
    state: {
      options: Object.values(State),
      control: 'select',
    },
    errorMessage: {
      control: 'text',
    },
    searchEmptyMessage: { control: 'text' },
    searchState: {
      options: Object.values(SearchState),
      control: 'select',
    },
    searchErrorMessage: {
      control: 'text',
      if: { arg: 'searchState', eq: SearchState.error },
    },
    searchLoadingMessage: {
      control: 'text',
      if: { arg: 'searchState', eq: SearchState.loading },
    },
    chipTruncationLocation: {
      options: Object.values(TruncationLocation),
      control: 'select',
      if: { arg: 'multiselect' },
    },
    chipCharacterLimit: {
      control: 'number',
      if: { arg: 'multiselect' },
    },
    overflow: {
      options: Object.values(Overflow),
      control: 'select',
      if: { arg: 'multiselect' },
    },
  },
};

export default meta;

export const LiveExample: StoryFn<ComboboxProps<boolean>> = (
  args: ComboboxProps<boolean>,
) => {
  return (
    <>
      {/* Since Combobox doesn't fully refresh when `multiselect` changes, we need to explicitly render a different instance */}
      {args.multiselect ? (
        <Combobox key="multi" {...args} multiselect={true} />
      ) : (
        <Combobox key="single" {...args} multiselect={false} />
      )}
    </>
  );
};
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ControlledSingleSelect = () => {
  const [selection, setSelection] = useState<string | null>(null);

  const handleChange = (value: string | null) => {
    setSelection(value);
  };

  return (
    <div>
      <Combobox
        multiselect={false}
        label="Choose a fruit"
        description="Please pick one"
        placeholder="Select fruit"
        onChange={handleChange}
        value={selection}
      >
        <ComboboxOption value="apple" />
        <ComboboxOption value="banana" />
        <ComboboxOption value="carrot" />
      </Combobox>
      <Button onClick={() => setSelection('carrot')}>Select Carrot</Button>
    </div>
  );
};
ControlledSingleSelect.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ExternalFilter = () => {
  const allOptions = [
    'apple',
    'banana',
    'carrot',
    'dragonfruit',
    'eggplant',
    'fig',
    'grape',
    'honeydew',
    'iceberg-lettuce',
    'jalapeño',
  ];

  const [filteredOptions, setOptions] = useState(['carrot', 'grape']);

  const handleFilter = (input: string) => {
    setOptions(allOptions.filter(option => option.includes(input)));
  };

  return (
    <Combobox
      label="Choose some fruit"
      placeholder="Select fruit"
      initialValue={['apple', 'fig', 'raspberry']}
      multiselect={true}
      overflow={'expand-y'}
      onFilter={handleFilter}
      filteredOptions={filteredOptions}
    >
      {allOptions.map(option => (
        <ComboboxOption key={option} value={option} />
      ))}
    </Combobox>
  );
};
ExternalFilter.parameters = {
  chromatic: { disableSnapshot: true },
};

export const SingleSelect: StoryType<typeof Combobox> = () => <></>;
SingleSelect.args = {
  multiselect: false,
};
SingleSelect.parameters = {
  generate: {
    combineArgs: {
      value: [undefined, 'apple'],
    },
  },
};

export const MultiSelect = () => <></>;
MultiSelect.args = {
  multiselect: true,
};
MultiSelect.parameters = {
  generate: {
    combineArgs: {
      value: [undefined, multiValue],
    },
  },
};
