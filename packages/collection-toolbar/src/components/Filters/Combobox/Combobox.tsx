import React from 'react';

import { Combobox as LGCombobox } from '@leafygreen-ui/combobox';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { consoleOnce } from '@leafygreen-ui/lib';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../share.types';

import { getComboboxStyles } from './Combobox.styles';
import { ComboboxProps } from './Combobox.types';

// Note: LGCombobox doesn't support ref forwarding
const ComboboxComponent = <M extends boolean>({
  //Add default values for aria-label to satisfy LGCombobox props
  'aria-label': ariaLabel = '',
  className,
  label,
  ...props
}: ComboboxProps<M>) => {
  const { size } = useCollectionToolbarContext();

  if (!ariaLabel && !label) {
    consoleOnce.error(
      'For screen-reader accessibility, aria-label must be provided to Combobox.',
    );
  }

  return (
    <LGCombobox
      label={label}
      size={size}
      aria-label={ariaLabel}
      className={getComboboxStyles({ className })}
      {...props}
    />
  );
};

ComboboxComponent.displayName = 'Combobox';

export const Combobox = CompoundSubComponent(ComboboxComponent, {
  displayName: 'Combobox',
  key: CollectionToolbarFiltersSubComponentProperty.Combobox,
});
