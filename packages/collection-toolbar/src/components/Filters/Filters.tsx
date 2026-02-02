import React, { forwardRef, useMemo } from 'react';

import {
  CompoundSubComponent,
  findChildren,
} from '@leafygreen-ui/compound-component';
import { consoleOnce } from '@leafygreen-ui/lib';

import { useCollectionToolbarContext } from '../../Context/CollectionToolbarProvider';
import { CollectionToolbarSubComponentProperty } from '../../shared.types';
import { getIsFilterCountValid, MAX_FILTER_COUNT } from '../../utils';

import { Combobox } from './Combobox';
import { ComboboxOption } from './ComboboxOption';
import { DatePicker } from './DatePicker';
import { getFiltersStyles } from './Filters.styles';
import { FiltersProps } from './Filters.types';
import { NumberInput } from './NumberInput';
import { SegmentedControl } from './SegmentedControl';
import { SegmentedControlOption } from './SegmentedControlOption';
import { Select } from './Select';
import { SelectOption } from './SelectOption';
import { CollectionToolbarFiltersSubComponentProperty } from './share.types';
import { TextInput } from './TextInput';

/**
 * Filters component
 *
 * @param className - Class name to apply to the component
 * @param children - Children to render
 * @param props - Props to apply to the component
 * @returns React element
 *
 * @note Default and Collapsible variants allow up to 5 filters.
 * @note Compact variant allows up to 2 filters.
 */
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

      const isFilterCountValid = useMemo(
        () => getIsFilterCountValid(filterComponents.length, variant),
        [filterComponents.length, variant],
      );

      if (!isFilterCountValid) {
        consoleOnce.error(
          `CollectionToolbarFilters with ${variant} variant can only have up to ${MAX_FILTER_COUNT[variant]} filters`,
        );
      }

      return (
        <div
          ref={fwdRef}
          className={getFiltersStyles({ className, variant })}
          {...props}
          data-lgid={lgIds.filters}
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
    SegmentedControlOption,
    SelectOption,
    TextInput,
    Combobox,
    ComboboxOption,
    DatePicker,
  },
);
