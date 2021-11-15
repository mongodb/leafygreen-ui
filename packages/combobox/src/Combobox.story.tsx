import React from 'react';
import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Icon from '@leafygreen-ui/Icon';
import Button from '@leafygreen-ui/button';
import { uiColors } from '@leafygreen-ui/palette';
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

storiesOf('Combobox', module)
  .add('Single Select', () => {
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
          errorMessage="No Pomegranates!"
          onChange={handleChange}
          filter={select(
            'Filter type',
            ['starts-with', 'includes', undefined],
            'includes',
          )}
        >
          <ComboboxOption value="apple" />
          <ComboboxOption value="banana" />
          <ComboboxOption value="carrot" />
          <ComboboxOption value="dragonfruit" />
          <ComboboxOption value="eggplant" />
          <ComboboxOption value="fig" />
          <ComboboxOption value="grape" />
          <ComboboxOption value="honeydew" />
          <ComboboxOption value="iceberg-lettuce" />
          <ComboboxOption
            value="pomegranate"
            glyph={<Icon glyph="Warning" />}
          />
          <ComboboxGroup label="Peppers">
            <ComboboxOption value="cayenne" />
            <ComboboxOption value="ghost-pepper" displayName="Ghost pepper" />
            <ComboboxOption value="habanero" />
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
      if (value.includes('dragonfruit')) {
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
          initialValue={['apple', 'fig']}
          multiselect={true}
          overflow={select(
            'Overflow',
            ['expand-y', 'expand-x', 'scroll-x'],
            'expand-y',
          )}
          state={isError ? 'error' : 'none'}
          errorMessage="Can't pick Dragonfruit"
          onChange={handleChange}
          chipTruncationLocation={select(
            'Chip Truncation Location',
            ['start', 'middle', 'end', 'none'],
            'middle',
          )}
          filter={select(
            'Filter type',
            ['starts-with', 'includes', undefined],
            'includes',
          )}
          // disabled={boolean('Disabled', false)}
        >
          <ComboboxOption value="apple" />
          <ComboboxOption value="banana" />
          <ComboboxOption value="carrot" />
          <ComboboxOption
            value="dragonfruit"
            glyph={<Icon glyph="Favorite" color={uiColors.blue.base} />}
          />
          <ComboboxOption value="eggplant" />
          <ComboboxOption value="fig" />
          <ComboboxOption value="grape" />
          <ComboboxOption value="honeydew" />
          <ComboboxOption value="iceberg-lettuce" />
          <ComboboxGroup label="Peppers">
            <ComboboxOption value="cayenne" />
            <ComboboxOption value="ghost-pepper" displayName="Ghost pepper" />
            <ComboboxOption value="habanero" />
            <ComboboxOption value="jalapeno" displayName="Jalapeño" />
            <ComboboxOption value="scotch-bonnet" displayName="Scotch bonnet" />
          </ComboboxGroup>
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
  .add('Controlled', () => {
    const [selection, setSelection] = useState([]);

    const handleChange = (value: Array<string>) => {
      console.log({ value });
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
        <Button onClick={() => setSelection(['apple', 'banana', 'carrot'])}>
          Select all
        </Button>
      </Wrapper>
    );
  });
