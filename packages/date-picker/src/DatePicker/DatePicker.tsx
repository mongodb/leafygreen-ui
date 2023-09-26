import React, { forwardRef, useState } from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';

import { DatePickerProvider } from '../DatePickerContext';
import { contextPropNames } from '../DatePickerContext/DatePickerContext.utils';
import { useControlledValue } from '../hooks/useControlledValue';
import { pickAndOmit } from '../utils/pickAndOmit';

import { DatePickerProps } from './DatePicker.types';
import { DatePickerComponent } from './DatePickerComponent';

/**
 * LeafyGreen Date Picker component
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value: valueProp,
      initialValue: initialProp,
      onChange: onChangeProp,
      handleValidation,
      ...props
    }: DatePickerProps,
    fwdRef,
  ) => {
    const [contextProps, restProps] = pickAndOmit(props, contextPropNames);
    const menuId = useIdAllocator({ prefix: 'lg-date-picker-menu' });
    const [isOpen, setOpen] = useState(false);

    const { value, setValue } = useControlledValue(
      valueProp,
      onChangeProp,
      initialProp,
    );

    // useEffect(() => {
    //   const logActiveElement = () => {
    //     console.log(document.activeElement);
    //   };

    //   document.addEventListener('focusin', logActiveElement);

    //   return () => document.removeEventListener('focusin', logActiveElement);
    // }, []);

    return (
      <DatePickerProvider
        value={{
          ...contextProps,
          isOpen,
          setOpen,
          menuId,
        }}
      >
        <DatePickerComponent
          ref={fwdRef}
          value={value}
          setValue={setValue}
          {...restProps}
        />
      </DatePickerProvider>
    );
  },
);

DatePicker.displayName = 'DatePicker';
