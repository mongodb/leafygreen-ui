import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Icon from '@leafygreen-ui/icon';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { Combobox, ComboboxOption, ComboboxGroup } from '.';
import { useState } from '@storybook/client-api';

const Wrapper = ({ children }: any) => (
  <div
    className={css`
      width: 384px;
      height: 100vh;
    `}
  >
    <LeafygreenProvider>{children}</LeafygreenProvider>
  </div>
);

storiesOf('Packages/Combobox', module)
  .add('Single Select', () => {
    const [isError, setIsError] = useState(false);

    const handleChange = (value: string | null) => {
      if (value === 'pomegranate') {
        setIsError(true);
      } else {
        setIsError(false);
      }
    };

    return (
      <Wrapper>
        <Combobox
          label="Choose a fruit"
          description="Please pick one"
          placeholder="Select fruit"
          searchState={select(
            'Seach state',
            ['unset', 'error', 'loading'],
            'unset',
          )}
          state={isError ? 'error' : 'none'}
          disabled={boolean('Disabled', false)}
          errorMessage="No Pomegranates!"
          onChange={handleChange}
        >
          <ComboboxOption value="apple" displayName="Apple" />
          <ComboboxOption value="banana" displayName="Banana" />
          <ComboboxOption value="carrot" displayName="Carrot" />
          <ComboboxOption
            value="paragraph"
            displayName="Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper."
          />
          <ComboboxOption
            value="hash"
            displayName="5f4dcc3b5aa765d61d8327deb882cf99"
          />
          <ComboboxOption value="dragonfruit" displayName="Dragonfruit" />
          <ComboboxOption value="eggplant" displayName="Eggplant" />
          <ComboboxOption value="fig" displayName="Fig" />
          <ComboboxOption value="grape" displayName="Grape" />
          <ComboboxOption value="honeydew" displayName="Honeydew" />
          <ComboboxOption
            value="iceberg-lettuce"
            displayName="Iceberg lettuce"
          />
          <ComboboxOption
            value="pomegranate"
            displayName="Pomegranate"
            glyph={<Icon glyph="Warning" />}
          />
          <ComboboxGroup label="Peppers">
            <ComboboxOption value="cayenne" displayName="Cayenne" />
            <ComboboxOption value="ghost-pepper" displayName="Ghost pepper" />
            <ComboboxOption value="habanero" displayName="Habanero" />
            <ComboboxOption value="jalapeno" displayName="Jalapeño" />
            <ComboboxOption value="red-pepper" displayName="Red pepper" />
            <ComboboxOption value="scotch-bonnet" displayName="Scotch bonnet" />
          </ComboboxGroup>
        </Combobox>
      </Wrapper>
    );
  })
  .add('Multi Select', () => {
    const [isError, setIsError] = useState(false);

    const handleChange = (value: Array<string>) => {
      if (value.includes('pomegranate')) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    };

    return (
      <Wrapper>
        <Combobox
          label="Choose some fruit"
          description="Pick as many as you want!"
          placeholder="Select fruit"
          initialValue={['apple', 'carrot', 'fig']}
          multiselect={true}
          overflow={select(
            'Overflow',
            ['expand-y', 'expand-x', 'scroll-x'],
            'expand-y',
          )}
          state={isError ? 'error' : 'none'}
          errorMessage="No Pomegranates!"
          onChange={handleChange}
          chipTruncationLocation={select(
            'Chip Truncation Location',
            ['start', 'middle', 'end', 'none'],
            'middle',
          )}
        >
          <ComboboxOption value="apple" displayName="Apple" />
          <ComboboxOption value="banana" displayName="Banana" />
          <ComboboxOption value="carrot" displayName="Carrot" />
          <ComboboxOption value="dragonfruit" displayName="Dragonfruit" />
          <ComboboxOption value="eggplant" displayName="Eggplant" />
          <ComboboxOption value="fig" displayName="Fig" />
          <ComboboxOption value="grape" displayName="Grape" />
          <ComboboxOption value="honeydew" displayName="Honeydew" />
          <ComboboxOption
            value="iceberg-lettuce"
            displayName="Iceberg lettuce"
          />
          <ComboboxOption
            value="pomegranate"
            displayName="Pomegranate"
            glyph={<Icon glyph="Warning" />}
          />
          <ComboboxGroup label="Peppers">
            <ComboboxOption value="cayenne" displayName="Cayenne" />
            <ComboboxOption value="ghost-pepper" displayName="Ghost pepper" />
            <ComboboxOption value="habanero" displayName="Habanero" />
            <ComboboxOption value="jalapeno" displayName="Jalapeño" />
            <ComboboxOption value="red-pepper" displayName="Red pepper" />
            <ComboboxOption value="scotch-bonnet" displayName="Scotch bonnet" />
          </ComboboxGroup>
        </Combobox>
      </Wrapper>
    );
  })
  .add('External filter', () => {
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
      <Wrapper>
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
      </Wrapper>
    );
  })
  .add('Empty', () => {
    return (
      <Wrapper>
        <Combobox
          multiselect={false}
          label="Choose a fruit"
          description="Please pick one"
          placeholder="Select fruit"
        ></Combobox>
      </Wrapper>
    );
  })
  .add('Controlled single select', () => {
    const [selection, setSelection] = useState<string | null>(null);

    const handleChange = (value: string | null) => {
      setSelection(value);
    };

    return (
      <Wrapper>
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
      </Wrapper>
    );
  })
  .add('Controlled multiselect', () => {
    const [selection, setSelection] = useState([] as Array<string>);

    const handleChange = (value: Array<string>) => {
      setSelection(value);
    };

    return (
      <Wrapper>
        <Combobox
          multiselect={true}
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
        <Button
          onClick={() =>
            setSelection(['apple', 'banana', 'carrot', 'raspberry'])
          }
        >
          Select all
        </Button>
      </Wrapper>
    );
  });
