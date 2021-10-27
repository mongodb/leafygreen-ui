import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Combobox from '.';
import ComboboxOption from './ComboboxOption';

storiesOf('Combobox', module).add('Default', () => {
  return (
    <LeafygreenProvider>
      <Combobox
        label="Choose an fruit"
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
});
