import React from 'react';

import { Combobox as LGCombobox } from '@leafygreen-ui/combobox';
import {
  CompoundSubComponent,
  findChildren,
} from '@leafygreen-ui/compound-component';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../share.types';

import { getComboboxStyles } from './Combobox.styles';
import { ComboboxProps } from './Combobox.types';

// Note: LGCombobox doesn't support ref forwarding
const ComboboxComponent = <M extends boolean>({
  className,
  children,
  ...props
}: ComboboxProps<M>) => {
  const { size } = useCollectionToolbarContext();

  const comboboxOptions = findChildren(
    children,
    CollectionToolbarFiltersSubComponentProperty.ComboboxOption,
  );

  return (
    <LGCombobox
      size={size}
      className={getComboboxStyles({ className })}
      {...props}
    >
      {comboboxOptions}
    </LGCombobox>
  );
};

ComboboxComponent.displayName = 'Combobox';

export const Combobox = CompoundSubComponent(ComboboxComponent, {
  displayName: 'Combobox',
  key: CollectionToolbarFiltersSubComponentProperty.Combobox,
});
