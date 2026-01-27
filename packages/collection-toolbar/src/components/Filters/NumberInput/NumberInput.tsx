import React, { ComponentType, forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { NumberInput as LGNumberInput } from '@leafygreen-ui/number-input';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarFiltersSubComponentProperty } from '../share.types';

import { getInputStyles } from './NumberInput.styles';
import { NumberInputProps } from './NumberInput.types';

export const NumberInput = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLInputElement, NumberInputProps>(
    (
      {
        unitOptions,
        unit,
        onSelectChange,
        selectClassName,
        inputClassName,
        ...rest
      },
      fwdRef,
    ) => {
      const { size } = useCollectionToolbarContext();

      // Handle the two variants of NumberInput separately to satisfy the union type
      if (unitOptions && unitOptions.length > 0) {
        return (
          <LGNumberInput
            ref={fwdRef}
            size={size}
            unitOptions={unitOptions}
            unit={unit as string}
            onSelectChange={onSelectChange!}
            selectClassName={selectClassName}
            inputClassName={getInputStyles({ className: inputClassName })}
            {...rest}
          />
        );
      }

      return (
        <LGNumberInput
          ref={fwdRef}
          size={size}
          unit={unit}
          inputClassName={getInputStyles({ className: inputClassName })}
          {...rest}
        />
      );
    },
    // Cast required for React 17: TypeScript cannot reconcile ForwardRefExoticComponent's propTypes
    // with the AriaLabelProps discriminated union (aria-label OR aria-labelledby required)
  ) as ComponentType<NumberInputProps>,
  {
    displayName: 'NumberInput',
    key: CollectionToolbarFiltersSubComponentProperty.NumberInput,
  },
);
