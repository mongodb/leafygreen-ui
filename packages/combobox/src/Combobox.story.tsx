import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Combobox from '.';
import ComboboxOption from './ComboboxOption';
import { css } from '@leafygreen-ui/emotion';

storiesOf('Combobox', module)
  .add('Single Select', () => {
    return (
      <LeafygreenProvider>
        <Combobox
          label="Choose a fruit"
          description="Please pick one"
          placeholder="Select fruit"
          // disabled={boolean('Disabled', false)}
        >
          <ComboboxOption value="apple" />
          <ComboboxOption value="banana" />
          <ComboboxOption value="carrot" />
          <ComboboxOption value="dragonfruit" />
          <ComboboxOption value="eggplant" />
        </Combobox>
      </LeafygreenProvider>
    );
  })
  .add('Multi Select', () => {
    return (
      <LeafygreenProvider>
        <Combobox
          label="Choose some fruit"
          description="Pick as many as you want!"
          placeholder="Select fruit"
          multiselect={true}
          // disabled={boolean('Disabled', false)}
        >
          <ComboboxOption value="apple" />
          <ComboboxOption value="banana" />
          <ComboboxOption value="carrot" />
          <ComboboxOption value="dragonfruit" />
          <ComboboxOption value="eggplant" />
          <ComboboxOption value="fig" />
          <ComboboxOption value="grape" />
          <ComboboxOption value="honeydew" />
          <ComboboxOption value="iceberg" />
          <ComboboxOption value="jellybean" />
        </Combobox>
      </LeafygreenProvider>
    );
  });
