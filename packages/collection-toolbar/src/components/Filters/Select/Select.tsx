import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { Select as LGSelect } from '@leafygreen-ui/select';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../../../shared.types';

import { SelectProps } from './Select.types';

export const Select = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, SelectProps>(
    (
      {
        label,
        'aria-label': ariaLabel = '',
        'aria-labelledby': ariaLabelledby,
        value,
        defaultValue,
        onChange,
        ref: _ref,
        ...rest
      },
      fwdRef,
    ) => {
      const { size } = useCollectionToolbarContext();

      // Handle controlled vs uncontrolled variants separately
      if (value !== undefined) {
        return (
          <LGSelect
            size={size}
            ref={fwdRef}
            label={label}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            value={value}
            onChange={onChange}
            {...rest}
          />
        );
      }

      return (
        <LGSelect
          size={size}
          ref={fwdRef}
          label={label}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          defaultValue={defaultValue}
          onChange={onChange}
          {...rest}
        />
      );
    },
  ),
  {
    displayName: 'Select',
    key: CollectionToolbarFiltersSubComponentProperty.Select,
  },
);
