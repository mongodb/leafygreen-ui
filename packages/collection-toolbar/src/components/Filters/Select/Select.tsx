import React, { forwardRef } from 'react';

import {
  CompoundSubComponent,
  findChildren,
} from '@leafygreen-ui/compound-component';
import { Select as LGSelect } from '@leafygreen-ui/select';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../share.types';

import { SelectProps } from './Select.types';

export const Select = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, SelectProps>(
    ({ ref: _ref, children, ...rest }, fwdRef) => {
      const { size } = useCollectionToolbarContext();

      const selectOptions = findChildren(
        children,
        CollectionToolbarFiltersSubComponentProperty.SelectOption,
      );

      return (
        <LGSelect size={size} ref={fwdRef} {...rest}>
          {selectOptions}
        </LGSelect>
      );
    },
  ),
  {
    displayName: 'Select',
    key: CollectionToolbarFiltersSubComponentProperty.Select,
  },
);
