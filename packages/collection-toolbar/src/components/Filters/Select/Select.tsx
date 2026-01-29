import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { Select as LGSelect } from '@leafygreen-ui/select';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../share.types';

import { SelectProps } from './Select.types';

export const Select = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, SelectProps>(({ ref: _ref, ...rest }, fwdRef) => {
    const { size } = useCollectionToolbarContext();

    return <LGSelect size={size} ref={fwdRef} {...rest} />;
  }),
  {
    displayName: 'Select',
    key: CollectionToolbarFiltersSubComponentProperty.Select,
  },
);
