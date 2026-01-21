
import React, { forwardRef } from 'react';

import { CompoundSubComponent, findChildren } from '@leafygreen-ui/compound-component';

import { useCollectionToolbarContext } from '../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty, CollectionToolbarSubComponentProperty } from '../../shared.types';

import { Combobox } from './Combobox';
import { DatePicker } from './DatePicker';
import { getFiltersStyles } from './Filters.styles';
import { FiltersProps } from './Filters.types';
import { NumberInput } from './NumberInput';
import { SegmentedControl } from './SegmentedControl';
import { Select } from './Select';
import { TextInput } from './TextInput';

export const Filters = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, FiltersProps>(
    ({ className, children, ...props }, fwdRef) => {
      const { lgIds } = useCollectionToolbarContext();

      const filterComponents = findChildren(
        children,
        [
          CollectionToolbarFiltersSubComponentProperty.NumberInput,
          CollectionToolbarFiltersSubComponentProperty.Select,
          CollectionToolbarFiltersSubComponentProperty.SegmentedControl,
          CollectionToolbarFiltersSubComponentProperty.TextInput,
          CollectionToolbarFiltersSubComponentProperty.Combobox,
          CollectionToolbarFiltersSubComponentProperty.DatePicker,
        ],
      );


      return (
        <div
          ref={fwdRef}
          className={getFiltersStyles({ className })}
          data-lgid={lgIds.filters}
          {...props}
        >
          {filterComponents}
        </div>
      );
    },
  ),
  {
    displayName: 'Filters',
    key: CollectionToolbarSubComponentProperty.Filters,
    NumberInput,
    Select,
    SegmentedControl,
    TextInput,
    Combobox,
    DatePicker,
  },
);
