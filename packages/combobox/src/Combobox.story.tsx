import React, { useState } from 'react';
import Icon from '@leafygreen-ui/icon';
import Button from '@leafygreen-ui/button';
import { Combobox, ComboboxOption, ComboboxGroup } from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';

const wrapperStyle = css`
  width: 256px;
`;

export default {
  title: 'Packages/Combobox',
  component: Combobox,
  parameters: {
    controls: { exclude: ['children', 'setError'] },
  },
} as ComponentMeta<typeof Combobox>;

const ComboboxOptions = [
  <ComboboxOption key="apple" value="apple" displayName="Apple" />,
  <ComboboxOption key="banana" value="banana" displayName="Banana" />,
  <ComboboxOption key="carrot" value="carrot" displayName="Carrot" />,
  <ComboboxOption
    key="paragraph"
    value="paragraph"
    displayName="Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper."
  />,
  <ComboboxOption
    key="hash"
    value="hash"
    displayName="5f4dcc3b5aa765d61d8327deb882cf99"
  />,
  <ComboboxOption
    key="dragonfruit"
    value="dragonfruit"
    displayName="Dragonfruit"
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
  <ComboboxOption
    key="pomegranate"
    value="pomegranate"
    displayName="Pomegranate"
    glyph={<Icon glyph="Warning" />}
  />,
  <ComboboxGroup key="peppers" label="Peppers">
    <ComboboxOption key="cayenne" value="cayenne" displayName="Cayenne" />
    <ComboboxOption
      key="ghost-pepper"
      value="ghost-pepper"
      displayName="Ghost pepper"
      disabled
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
    />
  </ComboboxGroup>,
];

const Template: ComponentStory<typeof Combobox> = args => (
  <div className={wrapperStyle}>
    <Combobox {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  label: 'Choose a fruit',
  description: 'Please pick one',
  placeholder: 'Select fruit',
  children: ComboboxOptions,
};

export const Empty = Template.bind({});
Empty.args = {
  label: 'Choose a fruit',
  description: 'Please pick one',
  placeholder: 'Select fruit',
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  label: 'Choose a fruit',
  description: 'Please pick one',
  placeholder: 'Select fruit',
  children: ComboboxOptions,
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
  description: 'Please pick one',
  placeholder: 'Select fruit',
  multiselect: true,
  children: ComboboxOptions,
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
