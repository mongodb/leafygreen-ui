import React, { forwardRef } from 'react';

import {
  CompoundSubComponent,
  findChildren,
} from '@leafygreen-ui/compound-component';

import { useCollectionToolbarContext } from '../../Context/CollectionToolbarProvider';
import { CollectionToolbarSubComponentProperty } from '../../shared.types';

import { Combobox } from './Combobox';
import { ComboboxOption } from './ComboBoxOption1';
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

export const Filters = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, FiltersProps>(
    ({ className, children, ...props }, fwdRef) => {
      const { lgIds } = useCollectionToolbarContext();

      // TODO: add max-filter count logic in LG-5845
      const filterComponents = findChildren(children, [
        CollectionToolbarFiltersSubComponentProperty.NumberInput,
        CollectionToolbarFiltersSubComponentProperty.Select,
        CollectionToolbarFiltersSubComponentProperty.SegmentedControl,
        CollectionToolbarFiltersSubComponentProperty.TextInput,
        CollectionToolbarFiltersSubComponentProperty.Combobox,
        CollectionToolbarFiltersSubComponentProperty.DatePicker,
      ]);

      return (
        <div
          ref={fwdRef}
          className={getFiltersStyles({ className })}
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
