import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { TextInput as LGTextInput } from '@leafygreen-ui/text-input';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../../../shared.types';

import { TextInputProps } from './TextInput.types';

export const TextInput = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLInputElement, TextInputProps>(
    ({ 'aria-label': ariaLabel = '', ...props }, fwdRef) => {
      const { size } = useCollectionToolbarContext();
      return (
        <LGTextInput
          sizeVariant={size}
          ref={fwdRef}
          aria-label={ariaLabel}
          {...props}
        />
      );
    },
  ),
  {
    displayName: 'TextInput',
    key: CollectionToolbarFiltersSubComponentProperty.TextInput,
  },
);
