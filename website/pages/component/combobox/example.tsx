import React, { useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import {
  Combobox,
  ComboboxOption,
  ComboboxGroup,
} from '@leafygreen-ui/combobox';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  multiselect: boolean;
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
    default: 'This is a description',
    label: 'Description',
  },
};

export default function SelectLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {knobs =>
        knobs.multiselect ? (
          <MultiSelect knobs={knobs} />
        ) : (
          <SingleSelect knobs={knobs} />
        )
      }
    </LiveExample>
  );
}

function SingleSelect({
  knobs: { label, description, placeholder, disabled },
}: any) {
  const [isError, setIsError] = useState(false);

  const handleChange = (value: string | null) => {
    if (value === 'pomegranate') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  return (
    <div
      className={css`
        width: 384px;
      `}
    >
      <Combobox
        multiselect={false}
        label={label}
        description={description}
        placeholder={placeholder}
        disabled={disabled}
        state={isError ? 'error' : 'none'}
        errorMessage="No Pomegranates!"
        onChange={handleChange}
      >
        <ComboboxOption value="apple" displayName="Apple" />
        <ComboboxOption value="banana" displayName="Banana" />
        <ComboboxOption value="carrot" displayName="Carrot" />
        <ComboboxOption value="dragonfruit" displayName="Dragon fruit" />
        <ComboboxOption value="eggplant" displayName="Eggplant" />
        <ComboboxOption
          value="pomegranate"
          displayName="Pomegranate"
          glyph={<Icon glyph="Warning" />}
        />
      </Combobox>
    </div>
  );
}

function MultiSelect({
  knobs: { label, description, placeholder, disabled },
}: any) {
  return (
    <div
      className={cx(
        css`
          width: 384px;
        `,
      )}
    >
      <Combobox
        multiselect={true}
        label={label}
        description={description}
        placeholder={placeholder}
        disabled={disabled}
      >
        <ComboboxOption value="apple" displayName="Apple" />
        <ComboboxOption value="banana" displayName="Banana" />
        <ComboboxOption value="carrot" displayName="Carrot" />
        <ComboboxOption value="dragonfruit" displayName="Dragon fruit" />
        <ComboboxOption value="eggplant" displayName="Eggplant" />
        <ComboboxGroup label="Peppers">
          <ComboboxOption value="cayenne" displayName="Cayenne" />
          <ComboboxOption value="ghost-pepper" displayName="Ghost pepper" />
          <ComboboxOption value="habanero" displayName="Habanero" />
          <ComboboxOption value="jalapeno" displayName="Jalapeño" />
          <ComboboxOption value="red-pepper" displayName="Red pepper" />
          <ComboboxOption value="scotch-bonnet" displayName="Scotch bonnet" />
        </ComboboxGroup>
      </Combobox>
    </div>
  );
}
