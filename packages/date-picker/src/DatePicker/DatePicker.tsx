import React, {
  forwardRef,
  MouseEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isSameMonth, setMonth } from 'date-fns';

import { useBackdropClick, useIdAllocator } from '@leafygreen-ui/hooks';

import {
  DatePickerContextProps,
  DatePickerProvider,
  DatePickerProviderProps,
} from '../DatePickerContext';
import { pickAndOmit } from '../utils/pickAndOmit';
import { toDate } from '../utils/toDate';

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
export const DatePicker = forwardRef(
  ({
    value: valueProp,
    initialValue,
    onChange,
    handleValidation,
    ...props
  }: DatePickerProps) => {
    const [contextProps, restProps] = pickAndOmit(props, contextPropNames);
    const menuId = useIdAllocator({ prefix: 'lg-date-picker-menu' });
    const inputRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [displayMonth, setDisplayMonth] = useState<Date>(new Date());
    const [isOpen, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);

    const utcValue = useMemo(() => toDate(valueProp), [valueProp]);

    const updateValue = (newVal: Date | null) => {
      // if the new value is not the current month, update the month
      if (newVal && !isSameMonth(newVal, displayMonth)) {
        setDisplayMonth(setMonth(displayMonth, newVal.getMonth()));
      }

      onChange?.(newVal);
    };

    useBackdropClick(closeMenu, [inputRef, menuRef], isOpen);

    const handleInputChange: DatePickerInputProps['setValue'] = (
      inputVal: Date | null,
    ) => {
      if (inputVal !== utcValue) updateValue(inputVal);
    };

    const handleCellClick: DatePickerMenuProps['onCellClick'] = cellValue => {
      console.log('onCellClick', cellValue);
      updateValue(cellValue);
      setOpen(false);
    };

    const handleMonthChange: DatePickerMenuProps['onMonthChange'] =
      newMonth => {
        setDisplayMonth(newMonth);
      };

    const handleInputClick: MouseEventHandler = e => {
      console.log('handleInputClick');
      // TODO: Set focus to appropriate segment
      setOpen(true);
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
          value={utcValue}
          setValue={handleInputChange}
          onClick={handleInputClick}
          {...restProps}
        />
        <DatePickerMenu
          ref={menuRef}
          id={menuId}
          refEl={inputRef}
          value={utcValue}
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
