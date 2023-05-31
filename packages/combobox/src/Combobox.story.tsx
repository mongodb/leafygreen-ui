import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import {
  defaultStorybookArgTypes,
  storybookExcludedControlParams,
  type StoryMetaType,
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
      props: {
        darkMode: [false, true],
        state: Object.values(State),
        size: Object.values(ComboboxSize),
        description: [undefined, 'Please pick fruit(s)'],
        label: [undefined, 'Choose a fruit'],
        clearable: [true, false],
        multiselect: [false, true],
        value: [undefined, 'apple', ['apple', 'banana']],
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
          value: ['apple', 'banana'],
        },
      ],
    },
  },

  args: {
    multiselect: false,
    darkMode: false,
    disabled: false,
    clearable: true,
    errorMessage: 'No Pomegranates!',
    children: getComboboxOptions(),
  },

  argTypes: {
    darkMode: defaultStorybookArgTypes.darkMode,
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
LiveExample.args = {
  label: 'Choose a fruit',
  description: 'Please pick fruit(s)',
  placeholder: 'Select fruit',
  children: getComboboxOptions(),
};

// const SingleTemplate: StoryFn<ComboboxProps<false>> = (
//   args: ComboboxProps<false>,
// ) => <Combobox {...args} />;

// export const SingleSelect: StoryFn<ComboboxProps<false>> = (
//   args: ComboboxProps<false>,
// ) => <Combobox {...args} />;
// SingleSelect.args = {
//   label: 'Choose a fruit',
//   description: 'Please pick one',
//   placeholder: 'Select fruit',
//   multiselect: false,
//   // children: getComboboxOptions(),
// };
// SingleSelect.argTypes = {
//   multiselect: { control: 'none' },
// };

// export const SingleSelectWithoutGlyphs = SingleTemplate.bind({});
// SingleSelectWithoutGlyphs.args = {
//   label: 'Choose a fruit',
//   description: 'Please pick one',
//   placeholder: 'Select fruit',
//   multiselect: false,
//   children: getComboboxOptions(false),
// };
// SingleSelectWithoutGlyphs.argTypes = {
//   multiselect: { control: 'none' },
// };

// export const WithError = SingleTemplate.bind({});
// WithError.args = {
//   label: 'Choose a fruit',
//   description: 'Please pick one',
//   placeholder: 'Select fruit',
//   value: 'pomegranates',
//   errorMessage: 'No Pomegranates!',
//   state: 'error',
// };

// const MultiTemplate: StoryFn<ComboboxProps<true>> = (
//   args: ComboboxProps<true>,
// ) => <Combobox {...args} />;

// export const Multiselect = MultiTemplate.bind({});
// Multiselect.args = {
//   label: 'Choose a fruit',
//   description: 'Please pick some',
//   placeholder: 'Select fruit',
//   multiselect: true,
//   children: getComboboxOptions(),
// };
// Multiselect.argTypes = {
//   multiselect: {
//     control: 'none',
//   },
// };

// export const MultiselectWithoutGlyphs = MultiTemplate.bind({});
// MultiselectWithoutGlyphs.args = {
//   label: 'Choose a fruit',
//   description: 'Please pick some',
//   placeholder: 'Select fruit',
//   multiselect: true,
//   children: getComboboxOptions(false),
// };
// MultiselectWithoutGlyphs.argTypes = {
//   multiselect: {
//     control: 'none',
//   },
// };

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

export const Generated = () => {};
