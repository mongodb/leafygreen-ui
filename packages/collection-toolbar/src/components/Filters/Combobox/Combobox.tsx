import React from 'react';

import { Combobox as LGCombobox } from '@leafygreen-ui/combobox';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { consoleOnce } from '@leafygreen-ui/lib';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../../../shared.types';

import { ComboboxProps } from './Combobox.types';

// Note: LGCombobox doesn't support ref forwarding
const ComboboxComponent = <M extends boolean>({ 'aria-label': ariaLabel, ...props }: ComboboxProps<M>) => {
  const { size } = useCollectionToolbarContext();

  if(!ariaLabel) {
    consoleOnce.error('For screen-reader accessibility, aria-label must be provided to Combobox.');
    return null;
  }

  return <LGCombobox size={size} aria-label={ariaLabel} {...props} />;
};

ComboboxComponent.displayName = 'Combobox';

export const Combobox = CompoundSubComponent(ComboboxComponent, {
  displayName: 'Combobox',
  key: CollectionToolbarFiltersSubComponentProperty.Combobox,
});
