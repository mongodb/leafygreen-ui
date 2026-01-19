import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { consoleOnce } from '@leafygreen-ui/lib';
import { NumberInput as LGNumberInput } from '@leafygreen-ui/number-input';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../../../shared.types';

import { NumberInputProps } from './NumberInput.types';

export const NumberInput = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLInputElement, NumberInputProps>(
    (
      {
        'aria-label': ariaLabel,
        unitOptions,
        unit,
        onSelectChange,
        selectClassName,
        ...rest
      },
      fwdRef,
    ) => {
      const { size } = useCollectionToolbarContext();

      if (!ariaLabel) {
        consoleOnce.error(
          'For screen-reader accessibility, aria-label must be provided to NumberInput.',
        );
        return null;
      }

      // Handle the two variants of NumberInput separately to satisfy the union type
      if (unitOptions && unitOptions.length > 0) {
        return (
          <LGNumberInput
            ref={fwdRef}
            size={size}
            aria-label={ariaLabel}
            unitOptions={unitOptions}
            unit={unit as string}
            onSelectChange={onSelectChange!}
            selectClassName={selectClassName}
            {...rest}
          />
        );
      }

      return (
        <LGNumberInput
          ref={fwdRef}
          size={size}
          aria-label={ariaLabel}
          unit={unit}
          {...rest}
        />
      );
    },
  ),
  {
    displayName: 'NumberInput',
    key: CollectionToolbarFiltersSubComponentProperty.NumberInput,
  },
);
