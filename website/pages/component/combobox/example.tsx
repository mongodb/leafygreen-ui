import React, { useState } from 'react';
import { css } from '@leafygreen-ui/emotion';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Icon from '@leafygreen-ui/icon';
import {
  Combobox,
  ComboboxOption,
  ComboboxGroup,
} from '@leafygreen-ui/combobox';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  multiselect: boolean;
  darkMode: boolean;
  disabled: boolean;
  label: string;
  description: string;
  placeholder: string;
}> = {
  multiselect: {
    type: 'boolean',
    default: false,
    label: 'Multiselect',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
  label: {
    type: 'text',
    default: 'Choose a fruit',
    label: 'Label',
  },
  placeholder: {
    type: 'text',
    default: 'Select...',
    label: 'Placeholder',
  },
  description: {
    type: 'text',
    default: '',
    label: 'Description',
  },
};

export default function SelectLiveExample() {
  return (
    <div
      className={css`
        width: 384px;
        height: 100vh;
      `}
    >
      <LeafygreenProvider>
        <LiveExample knobsConfig={knobsConfig}>
          {knobs =>
            knobs.multiselect ? (
              <MultiSelect knobs={knobs} />
            ) : (
              <SingleSelect knobs={knobs} />
            )
          }
        </LiveExample>
      </LeafygreenProvider>
    </div>
  );
}

function SingleSelect({
  knobs: { darkMode, label, description, placeholder, disabled },
}: any) {
  const [isError, setIsError] = useState(false);

  const handleChange = (value: string | null) => {
    console.log(value);
    if (value === 'pomegranate') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  return (
    <Combobox
      multiselect={false}
      label={label}
      description={description}
      placeholder={placeholder}
      darkMode={darkMode}
      disabled={disabled}
      state={isError ? 'error' : 'none'}
      errorMessage="No Pomegranates!"
      onChange={handleChange}
    >
      <ComboboxOption value="apple" />
      <ComboboxOption value="banana" />
      <ComboboxOption value="carrot" />
      <ComboboxOption value="dragonfruit" />
      <ComboboxOption value="eggplant" />
      <ComboboxOption value="pomegranate" glyph={<Icon glyph="Warning" />} />
    </Combobox>
  );
}

function MultiSelect({
  knobs: { darkMode, label, description, placeholder, disabled },
}: any) {
  return (
    <Combobox
      multiselect={true}
      label={label}
      description={description}
      placeholder={placeholder}
      darkMode={darkMode}
      disabled={disabled}
    >
      <ComboboxOption value="apple" />
      <ComboboxOption value="banana" />
      <ComboboxOption value="carrot" />
      <ComboboxOption value="dragonfruit" />
      <ComboboxOption value="eggplant" />
      <ComboboxGroup label="Peppers">
        <ComboboxOption value="cayenne" />
        <ComboboxOption value="ghost-pepper" displayName="Ghost pepper" />
        <ComboboxOption value="habanero" />
        <ComboboxOption value="jalapeno" displayName="Jalapeño" />
        <ComboboxOption value="red-pepper" displayName="Red pepper" />
        <ComboboxOption value="scotch-bonnet" displayName="Scotch bonnet" />
      </ComboboxGroup>
    </Combobox>
  );
}
