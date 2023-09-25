import React, { forwardRef, MouseEventHandler, useRef, useState } from 'react';
import { isSameMonth, setMonth } from 'date-fns';

import { useBackdropClick, useForwardedRef } from '@leafygreen-ui/hooks';

import { useDatePickerContext } from '../../DatePickerContext';
import { useSegmentRefs } from '../../hooks/useSegmentRefs';
import { DatePickerInput, DatePickerInputProps } from '../DatePickerInput';
import { DatePickerMenu, DatePickerMenuProps } from '../DatePickerMenu';
import { focusRelevantSegment } from '../utils/focusRelevantSegment';

import { DatePickerContentsProps } from './DatePickerContents.types';

export const DatePickerContents = forwardRef<
  HTMLDivElement,
  DatePickerContentsProps
>(
  (
    { value, setValue, handleValidation, ...rest }: DatePickerContentsProps,
    fwdRef,
  ) => {
    const { isOpen, setOpen, formatParts, menuId } = useDatePickerContext();
    const closeMenu = () => setOpen(false);

    const segmentRefs = useSegmentRefs();
    const formFieldRef = useForwardedRef(fwdRef, null);
    const menuRef = useRef<HTMLDivElement>(null);

    const [displayMonth, setDisplayMonth] = useState<Date>(value ?? new Date());

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

    const handleInputClick: MouseEventHandler<HTMLElement> = ({ target }) => {
      setOpen(true);

      focusRelevantSegment({
        target,
        formatParts,
        segmentRefs,
      });
    };

    const handleCellClick: DatePickerMenuProps['onCellClick'] = cellValue => {
      updateValue(cellValue);
      setOpen(false);
    };

    return (
      <>
        <DatePickerInput
          ref={formFieldRef}
          value={value}
          setValue={handleInputChange}
          onClick={handleInputClick}
          segmentRefs={segmentRefs}
          {...rest}
        />
        <DatePickerMenu
          ref={menuRef}
          id={menuId}
          refEl={formFieldRef}
          value={value}
          isOpen={isOpen}
          month={displayMonth}
          setMonth={setDisplayMonth}
          onCellClick={handleCellClick}
        />
      </>
    );
  },
);

DatePickerContents.displayName = 'DatePickerContents';
