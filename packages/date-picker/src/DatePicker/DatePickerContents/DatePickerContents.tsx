import React, { forwardRef, MouseEventHandler, useRef, useState } from 'react';
import { isSameMonth, setMonth } from 'date-fns';
import last from 'lodash/last';

import {
  useBackdropClick,
  useDynamicRefs,
  useForwardedRef,
} from '@leafygreen-ui/hooks';

import { DateSegment, isDateSegment } from '../../DateInput/DateInput.types';
import { useDatePickerContext } from '../../DatePickerContext';
import { DatePickerInput, DatePickerInputProps } from '../DatePickerInput';
import { DatePickerMenu, DatePickerMenuProps } from '../DatePickerMenu';

import { DatePickerContentsProps } from './DatePickerContents.types';

export const DatePickerContents = forwardRef<
  HTMLDivElement,
  DatePickerContentsProps
>(({ value, setValue, ...rest }: DatePickerContentsProps, fwdRef) => {
  const { isOpen, setOpen, formatParts, menuId } = useDatePickerContext();
  const closeMenu = () => setOpen(false);

  const getSegmentRef = useDynamicRefs<HTMLInputElement>({
    prefix: 'segment',
  });

  const segmentRefs: Record<DateSegment, ReturnType<typeof getSegmentRef>> = {
    day: getSegmentRef('day') || undefined,
    month: getSegmentRef('month') || undefined,
    year: getSegmentRef('year') || undefined,
  };

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

  const handleCellClick: DatePickerMenuProps['onCellClick'] = cellValue => {
    updateValue(cellValue);
    setOpen(false);
  };

  const handleMonthChange: DatePickerMenuProps['onMonthChange'] = newMonth => {
    setDisplayMonth(newMonth);
  };

  const handleInputClick: MouseEventHandler<HTMLElement> = e => {
    setOpen(true);

    if (!formatParts) {
      return;
    }

    const segmentRefsArray = Object.values(segmentRefs).map(r => r.current);

    // If we didn't explicitly click on an input segment...
    if (!segmentRefsArray.includes(e.target as HTMLInputElement)) {
      // filter out the literals from the format parts
      const formatSegments = formatParts.filter(
        part => part.type !== 'literal',
      );

      // Check which segments are filled,
      if (segmentRefsArray.every(el => el?.value)) {
        // if all are filled, focus the last one,
        const keyOfLastSegment = (
          last(formatSegments) as Intl.DateTimeFormatPart
        ).type;

        if (isDateSegment(keyOfLastSegment)) {
          const lastSegmentRef = segmentRefs[keyOfLastSegment];
          lastSegmentRef?.current?.focus();
        }
      } else {
        // if 1+ are empty, focus the first empty one
        const emptySegmentKeys = formatSegments
          .map(p => p.type)
          .filter(type => {
            if (isDateSegment(type)) {
              const element = segmentRefs[type];
              return !element?.current?.value;
            }
          });
        const firstEmptySegmentKey = emptySegmentKeys[0];

        if (isDateSegment(firstEmptySegmentKey)) {
          const firstEmptySegmentRef = segmentRefs[firstEmptySegmentKey];
          firstEmptySegmentRef?.current?.focus();
        }
      }
    }
    // otherwise, we clicked a specific segment,
    // so we focus on that segment (default behavior)
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
        onCellClick={handleCellClick}
        onMonthChange={handleMonthChange}
        usePortal={true}
      />
    </>
  );
});

DatePickerContents.displayName = 'DatePickerContents';
