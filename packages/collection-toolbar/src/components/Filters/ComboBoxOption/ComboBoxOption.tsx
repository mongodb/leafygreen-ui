import React from 'react';

import { ComboboxOption as LGComboboxOption } from '@leafygreen-ui/combobox';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { CollectionToolbarFiltersSubComponentProperty } from '../share.types';

import { ComboboxOptionProps } from './ComboBoxOption.types';

// Note: LGCombobox doesn't support ref forwarding
// LGComboboxOption technically does but doesn't play nice with ref forwarding
export const ComboboxOption = CompoundSubComponent(
  ({ ...props }: ComboboxOptionProps) => <LGComboboxOption {...props} />,
  {
    displayName: 'ComboboxOption',
    key: CollectionToolbarFiltersSubComponentProperty.ComboboxOption,
  },
);
