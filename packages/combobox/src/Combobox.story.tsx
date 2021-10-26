import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import Combobox from '.';

storiesOf('Combobox', module).add('Default', () => {
  return (
    <LeafygreenProvider>
      <Combobox
        label="Choose an animal"
        description="Please pick one"
        placeholder="Select animal"
        disabled={boolean('Disabled', false)}
      >
        Some children
      </Combobox>
    </LeafygreenProvider>
  );
});
