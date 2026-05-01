import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { TextInput as LGTextInput } from '@leafygreen-ui/text-input';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../share.types';

import { TextInputProps } from './TextInput.types';

export const TextInput = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLInputElement, TextInputProps>(({ ...props }, fwdRef) => {
    const { size } = useCollectionToolbarContext();

    return <LGTextInput sizeVariant={size} ref={fwdRef} {...props} />;
  }),
  {
    displayName: 'TextInput',
    key: CollectionToolbarFiltersSubComponentProperty.TextInput,
  },
);
