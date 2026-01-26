import React, { forwardRef, useMemo } from 'react';

import {
  CompoundSubComponent,
  findChildren,
} from '@leafygreen-ui/compound-component';
import { consoleOnce } from '@leafygreen-ui/lib';

import { useCollectionToolbarContext } from '../../Context/CollectionToolbarProvider';
import {
  CollectionToolbarFiltersSubComponentProperty,
  CollectionToolbarSubComponentProperty,
  Variant,
} from '../../shared.types';
import { getMaxFilterCount, MAX_FILTER_COUNT } from '../../utils';

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
      const { lgIds, variant } = useCollectionToolbarContext();

      const filterComponents = findChildren(children, [
        CollectionToolbarFiltersSubComponentProperty.NumberInput,
        CollectionToolbarFiltersSubComponentProperty.Select,
        CollectionToolbarFiltersSubComponentProperty.SegmentedControl,
        CollectionToolbarFiltersSubComponentProperty.TextInput,
        CollectionToolbarFiltersSubComponentProperty.Combobox,
        CollectionToolbarFiltersSubComponentProperty.DatePicker,
      ]);

      const count = filterComponents.length;
      const maxCount = useMemo(() => getMaxFilterCount(variant), [variant]);

      if (count > maxCount) {
        consoleOnce.error(
          `CollectionToolbar Filters can only have up to ${maxCount} filters`,
        );
      }

      return (
        <div
          ref={fwdRef}
          className={getFiltersStyles({ className })}
          data-lgid={lgIds.filters}
          {...props}
        >
          {filterComponents.slice(0, maxCount)}
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
