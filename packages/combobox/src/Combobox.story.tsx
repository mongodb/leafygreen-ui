import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Icon from '@leafygreen-ui/Icon';
import Combobox from '.';
import ComboboxOption from './ComboboxOption';
import { uiColors } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';

const Wrapper = ({ children }: any) => (
  <div
    className={css`
      height: 100vh;
    `}
  >
    <LeafygreenProvider>{children}</LeafygreenProvider>
  </div>
);

storiesOf('Combobox', module)
  .add('Single Select', () => {
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
          // disabled={boolean('Disabled', false)}
        >
          <ComboboxOption value="apple" />
          <ComboboxOption value="banana" />
          <ComboboxOption
            value="carrot"
            glyph={<Icon glyph="Cloud" color={uiColors.gray.base} />}
          />
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
    return (
      <Wrapper>
        <Combobox
          label="Choose some fruit"
          description="Pick as many as you want!"
          placeholder="Select fruit"
          multiselect={true}
          // disabled={boolean('Disabled', false)}
        >
          <ComboboxOption value="apple" />
          <ComboboxOption value="banana" />
          <ComboboxOption
            value="carrot"
            glyph={<Icon glyph="Cloud" color={uiColors.gray.base} />}
          />
          <ComboboxOption
            value="dragonfruit"
            glyph={<Icon glyph="Favorite" color={uiColors.blue.base} />}
          />
          <ComboboxOption value="eggplant" />
          <ComboboxOption value="fig" />
          <ComboboxOption value="grape" />
          <ComboboxOption value="honeydew" />
          <ComboboxOption value="iceberg" />
          <ComboboxOption value="jellybean" />
        </Combobox>
      </Wrapper>
    );
  })
  .add('Empty', () => {
    return (
      <Wrapper>
        <Combobox
          label="Choose a fruit"
          description="Please pick one"
          placeholder="Select fruit"
        ></Combobox>
      </Wrapper>
    );
  });
