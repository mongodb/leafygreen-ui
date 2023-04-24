import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { StoryMeta } from '@leafygreen-ui/lib';

import {
  ComboboxSize,
  Overflow,
  SearchState,
  State,
  TruncationLocation,
} from '../Combobox.types';
import { Combobox, ComboboxGroup, ComboboxOption } from '..';

const wrapperStyle = css`
  width: 256px;
  padding-block: 64px;
  display: flex;
`;

export default StoryMeta({
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    default: 'Demo',
    controls: {
      exclude: ['as', 'filteredOptions', 'initialValue', 'setError', 'value'],
    },
  },
  argTypes: {
    multiselect: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    darkMode: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
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
      if: { arg: 'state', eq: State.error },
    },
    searchEmptyMessage: {
      control: 'text',
    },
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
  args: {
    multiselect: false,
    darkMode: false,
    disabled: false,
    clearable: true,
  },
});

const getComboboxOptions = (withGlyphs = true) => [
  <ComboboxOption
    key="apple"
    value="apple"
    displayName="Apple"
    data-testid="test-id"
    description="Do I keep the doctor away?"
    // eslint-disable-next-line no-console
    onClick={(event, value) => console.log(event.currentTarget, value)}
  />,
  <ComboboxOption key="banana" value="banana" displayName="Banana" />,
  <ComboboxOption key="carrot" value="carrot" displayName="Carrot" disabled />,
  <ComboboxOption
    key="pomegranate"
    value="pomegranate"
    displayName="Pomegranate"
    glyph={withGlyphs ? <Icon glyph="Warning" /> : undefined}
    description="Watch out, I stain everything I touch LOL"
    disabled
  />,
  <ComboboxOption
    key="plantain"
    value="plantain"
    displayName="Plantain"
    glyph={withGlyphs ? <Icon glyph="Connect" /> : undefined}
    description="Don't confuse me with a banana"
    // eslint-disable-next-line no-console
    onClick={() => console.log('I was clicked')}
  />,
  <ComboboxOption
    key="paragraph"
    value="paragraph"
    displayName="Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper."
  />,
  <ComboboxOption
    key="hash"
    value="hash"
    displayName="5f4dcc3b5aa765d61d8327deb882cf995f4dcc3b5aa765d61d8327deb882cf99"
  />,
  <ComboboxOption
    key="dragonfruit"
    value="dragonfruit"
    displayName="Dragonfruit"
    description="Rawr"
  />,
  <ComboboxOption key="eggplant" value="eggplant" displayName="Eggplant" />,
  <ComboboxOption key="fig" value="fig" displayName="Fig" />,
  <ComboboxOption key="grape" value="grape" displayName="Grape" />,
  <ComboboxOption key="honeydew" value="honeydew" displayName="Honeydew" />,
  <ComboboxOption
    key="iceberg-lettuce"
    value="iceberg-lettuce"
    displayName="Iceberg lettuce"
  />,
  <ComboboxGroup key="peppers" label="Peppers">
    <ComboboxOption key="cayenne" value="cayenne" displayName="Cayenne" />
    <ComboboxOption
      key="ghost-pepper"
      value="ghost-pepper"
      displayName="Ghost pepper"
    />
    <ComboboxOption key="habanero" value="habanero" displayName="Habanero" />
    <ComboboxOption key="jalapeno" value="jalapeno" displayName="Jalapeño" />
    <ComboboxOption
      key="red-pepper"
      value="red-pepper"
      displayName="Red pepper"
    />
    <ComboboxOption
      key="scotch-bonnet"
      value="scotch-bonnet"
      displayName="Scotch bonnet"
      description="Don't touch your eyes"
    />
  </ComboboxGroup>,
];

const Template: ComponentStory<typeof Combobox> = args => (
  <div className={wrapperStyle}>
    <Combobox {...args} />
  </div>
);

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  label: 'Choose a fruit',
  description: 'Please pick one',
  placeholder: 'Select fruit',
  multiselect: false,
  children: getComboboxOptions(),
};
SingleSelect.argTypes = {
  multiselect: { control: 'none' },
};

export const SingleSelectWithoutGlyphs = Template.bind({});
SingleSelectWithoutGlyphs.args = {
  label: 'Choose a fruit',
  description: 'Please pick one',
  placeholder: 'Select fruit',
  multiselect: false,
  children: getComboboxOptions(false),
};
SingleSelectWithoutGlyphs.argTypes = {
  multiselect: { control: 'none' },
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Choose a fruit',
  description: 'Please pick one',
  placeholder: 'Select fruit',
  value: 'pomegranates',
  errorMessage: 'No Pomegranates!',
  state: 'error',
};

export const Multiselect = Template.bind({});
Multiselect.args = {
  label: 'Choose a fruit',
  description: 'Please pick some',
  placeholder: 'Select fruit',
  multiselect: true,
  children: getComboboxOptions(),
};
Multiselect.argTypes = {
  multiselect: {
    control: 'none',
  },
};

export const MultiselectWithoutGlyphs = Template.bind({});
MultiselectWithoutGlyphs.args = {
  label: 'Choose a fruit',
  description: 'Please pick some',
  placeholder: 'Select fruit',
  multiselect: true,
  children: getComboboxOptions(false),
};
MultiselectWithoutGlyphs.argTypes = {
  multiselect: {
    control: 'none',
  },
};

export const ControlledSingleSelect = () => {
  const [selection, setSelection] = useState<string | null>(null);

  const handleChange = (value: string | null) => {
    setSelection(value);
  };

  return (
    <>
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
    </>
  );
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

export const Demo: ComponentStory<typeof Combobox> = args => {
  return (
    <div className={wrapperStyle}>
      {/* Since Combobox doesn't fully refresh when `multiselect` changes, we need to explicitly render a different instance */}
      {args.multiselect ? (
        <Combobox key="multi" {...args} multiselect={true} />
      ) : (
        <Combobox key="single" {...args} multiselect={false} />
      )}
    </div>
  );
};
Demo.args = {
  label: 'Choose a fruit',
  description: 'Please pick fruit(s)',
  placeholder: 'Select fruit',
  children: getComboboxOptions(),
};
