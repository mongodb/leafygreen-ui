import React, { forwardRef, useRef } from 'react';

import { useBackdropClick, useForwardedRef } from '@leafygreen-ui/hooks';

import { useDatePickerContext } from '../../shared/DatePickerContext';
import { isSameUTCDay } from '../../utils';
import { DatePickerInput } from '../DatePickerInput';
import { DatePickerMenu, DatePickerMenuProps } from '../DatePickerMenu';

import { DatePickerComponentProps } from './DatePickerComponent.types';

export const DatePickerComponent = forwardRef<
  HTMLDivElement,
  DatePickerComponentProps
>(
  (
    { value, setValue, handleValidation, ...rest }: DatePickerComponentProps,
    fwdRef,
  ) => {
    const { isOpen, setOpen, isDirty, setIsDirty, menuId } =
      useDatePickerContext();
    const closeMenu = () => setOpen(false);

    const formFieldRef = useForwardedRef(fwdRef, null);
    const menuRef = useRef<HTMLDivElement>(null);

    /** setValue with possible side effects */
    const updateValue = (newVal: Date | null) => {
      setValue(newVal);
    };

    useBackdropClick(closeMenu, [formFieldRef, menuRef], isOpen);

    /** Called when the input's Date value has changed */
    const handleInputValueChange = (inputVal?: Date | null) => {
      if (!isSameUTCDay(inputVal, value)) {
        // When the value changes via the input element,
        // we only trigger validation if the component is dirty
        if (isDirty) {
          handleValidation?.(inputVal);
        }
        updateValue(inputVal || null);
      }
    };

    /** Called when any calendar cell is clicked */
    const handleCalendarCellClick: DatePickerMenuProps['onCellClick'] = (
      cellValue: Date,
    ) => {
      if (!isSameUTCDay(cellValue, value)) {
        // when the value is changed via cell,
        // we trigger validation every time
        handleValidation?.(cellValue);
        setIsDirty(true);
        // finally we update the component value
        updateValue(cellValue);
        // and close the menu
        setOpen(false);
      }
    };

    return (
      <>
        <DatePickerInput
          ref={formFieldRef}
          value={value}
          setValue={handleInputValueChange}
          handleValidation={handleValidation}
          {...rest}
        />
        <DatePickerMenu
          ref={menuRef}
          id={menuId}
          refEl={formFieldRef}
          value={value}
          onCellClick={handleCalendarCellClick}
        />
      </>
    );
  },
);

DatePickerComponent.displayName = 'DatePickerContents';
