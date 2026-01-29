import React from 'react';

import { Combobox as LGCombobox } from '@leafygreen-ui/combobox';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../share.types';

import { getComboboxStyles } from './Combobox.styles';
import { ComboboxProps } from './Combobox.types';
import { ComboboxOption } from './ComboBoxOption';

// Note: LGCombobox doesn't support ref forwarding
const ComboboxComponent = <M extends boolean>({
  className,
  ...props
}: ComboboxProps<M>) => {
  const { size } = useCollectionToolbarContext();

  return (
    <LGCombobox
      size={size}
      className={getComboboxStyles({ className })}
      {...props}
    />
  );
};

ComboboxComponent.displayName = 'Combobox';

export const Combobox = CompoundSubComponent(ComboboxComponent, {
  displayName: 'Combobox',
  key: CollectionToolbarFiltersSubComponentProperty.Combobox,
  ComboboxOption,
});
