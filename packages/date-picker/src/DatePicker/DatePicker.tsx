import React, { forwardRef, MouseEventHandler, useRef, useState } from 'react';
import { isSameMonth, setMonth } from 'date-fns';

import {
  useBackdropClick,
  useForwardedRef,
  useIdAllocator,
} from '@leafygreen-ui/hooks';

import {
  DatePickerProvider,
  DatePickerProviderProps,
} from '../DatePickerContext';
import { useControlledValue } from '../hooks/useControlledValue';
import { pickAndOmit } from '../utils/pickAndOmit';

import { DatePickerProps } from './DatePicker.types';
import { DatePickerInput, DatePickerInputProps } from './DatePickerInput';
import { DatePickerMenu, DatePickerMenuProps } from './DatePickerMenu';

/** Prop names that are in both DatePickerProps and DatePickerProviderProps */
const contextPropNames: Array<
  keyof Omit<DatePickerProviderProps, 'isOpen' | 'menuId'>
> = [
  'label',
  'dateFormat',
  'timeZone',
  'min',
  'max',
  'baseFontSize',
  'disabled',
  'size',
  'state',
  'errorMessage',
];

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
    const inputRef = useForwardedRef(fwdRef, null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);

    const { value, setValue } = useControlledValue(
      valueProp,
      onChangeProp,
      initialProp,
    );

    const [displayMonth, setDisplayMonth] = useState<Date>(
      valueProp ?? new Date(),
    );

    const updateValue = (newVal: Date | null) => {
      // if the new value is not the current month, update the month
      if (newVal && !isSameMonth(newVal, displayMonth)) {
        setDisplayMonth(setMonth(displayMonth, newVal.getMonth()));
      }

      setValue(newVal);
    };

    useBackdropClick(closeMenu, [inputRef, menuRef], isOpen);

    const handleInputChange: DatePickerInputProps['setValue'] = (
      inputVal: Date | null,
    ) => {
      if (inputVal !== value) {
        updateValue(inputVal);
      }
    };

    const handleCellClick: DatePickerMenuProps['onCellClick'] = cellValue => {
      updateValue(cellValue);
      setOpen(false);
    };

    const handleMonthChange: DatePickerMenuProps['onMonthChange'] =
      newMonth => {
        setDisplayMonth(newMonth);
      };

    const handleInputClick: MouseEventHandler = () => {
      setOpen(true);
      // TODO: Set focus to appropriate segment
    };

    return (
      <DatePickerProvider
        value={{
          ...contextProps,
          isOpen,
          menuId,
        }}
      >
        <DatePickerInput
          ref={inputRef}
          value={value}
          setValue={handleInputChange}
          onClick={handleInputClick}
          {...restProps}
        />
        <DatePickerMenu
          ref={menuRef}
          id={menuId}
          refEl={inputRef}
          value={value}
          isOpen={isOpen}
          month={displayMonth}
          onCellClick={handleCellClick}
          onMonthChange={handleMonthChange}
          usePortal={true}
        />
      </DatePickerProvider>
    );
  },
);

DatePicker.displayName = 'DatePicker';
