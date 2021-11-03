import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Icon from '@leafygreen-ui/Icon';
import { uiColors } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import { Combobox, ComboboxOption } from '.';
import Chip from './Chip';
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

    const handleChange = (value: string) => {
      console.log(value);
      if (value === 'dragonfruit') {
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
          errorMessage="No, not that one!"
          onChange={handleChange}
        >
          <ComboboxOption value="apple" />
          <ComboboxOption value="banana" />
          <ComboboxOption value="carrot" />
          <ComboboxOption
            value="dragonfruit"
            glyph={<Icon glyph="Favorite" color={uiColors.blue.base} />}
          />
          <ComboboxOption value="eggplant" />
        </Combobox>
      </Wrapper>
    );
  })
  .add('Multi Select', () => {
    const [isError, setIsError] = useState(false);

    const handleChange = (value: Array<string>) => {
      console.log(value);
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
          multiselect={true}
          initialValue={['apple', 'banana', 'carrot', 'jalapeno']}
          overflow={select(
            'Overflow',
            ['expand-y', 'expand-x', 'scroll-x'],
            'expand-y',
          )}
          state={isError ? 'error' : 'none'}
          errorMessage="Can't pick Dragonfruit"
          onChange={handleChange}
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
          <ComboboxOption value="iceberg" />
          <ComboboxOption value="jalapeno" displayName="Jalapeño" />
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
  .add('Chip', () => (
    <Chip
      value="aardvark"
      displayName="Aardvark"
      onRemove={() => {
        console.log(`Removing aardvark`);
      }}
    />
  ));
