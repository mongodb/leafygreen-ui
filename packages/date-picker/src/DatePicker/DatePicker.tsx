import React, { forwardRef, MouseEventHandler, useRef, useState } from 'react';
import { isSameMonth, setMonth } from 'date-fns';

import {
  useBackdropClick,
  useDynamicRefs,
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
  keyof DatePickerProviderProps & keyof DatePickerProps
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

    const formFieldRef = useForwardedRef(fwdRef, null);
    const inputBoxRef = useRef<HTMLDivElement>(null);
    const segmentRefs = useDynamicRefs<HTMLInputElement>({ prefix: 'segment' });
    console.assert(segmentRefs);

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

    useBackdropClick(closeMenu, [formFieldRef, menuRef], isOpen);

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
      // if we clicked a specific segment, focus on that segment
      // otherwise, check which segments are filled,
      // if all are filled, focus the last one,
      // if 1+ are empty, focus the first empty one
    };

    return (
      <DatePickerProvider
        value={{
          ...contextProps,
          isOpen,
          menuId,
          segmentRefs,
        }}
      >
        <DatePickerInput
          ref={formFieldRef}
          value={value}
          setValue={handleInputChange}
          onClick={handleInputClick}
          {...restProps}
        />
        <DatePickerMenu
          ref={menuRef}
          id={menuId}
          refEl={formFieldRef}
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
