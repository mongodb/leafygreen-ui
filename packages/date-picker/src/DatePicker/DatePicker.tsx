import React, { forwardRef, useMemo, useRef, useState } from 'react';
import { utcToZonedTime } from 'date-fns-tz';

import { useBackdropClick } from '@leafygreen-ui/hooks';

import { DatePickerProvider } from '../DatePickerContext';
import { toDate } from '../utils/toDate';
import { toClientTimeZone, toTimeZone } from '../utils/toTimeZone';

import { DatePickerProps } from './DatePicker.types';
import { DatePickerInput } from './DatePickerInput';
import { DatePickerMenu } from './DatePickerMenu';

export const DatePicker = forwardRef(
  ({
    value,
    initialValue,
    onChange,
    handleValidation,
    ...rest
  }: DatePickerProps) => {
    const inputRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);
    const [month, setMonth] = useState<Date>(new Date('2023-09-11'));

    const timeZonedValue = useMemo(() => {
      const utcDate = toDate(value) as Date;
      return utcDate
        ? utcToZonedTime(utcDate, rest.timeZone ?? 'default')
        : utcDate;
    }, [rest.timeZone, value]);

    console.log('Source', {
      type: typeof value,
      value,
      iso: value ? new Date(value).toISOString() : '',
      utc: value ? new Date(value).toUTCString() : '',
      dateString: value ? new Date(value).toDateString() : '',
      timeZonedValue,
    });

    const updateValue = (newVal: Date | null) => {
      const tzDate = newVal
        ? toClientTimeZone(newVal, rest.timeZone ?? 'default')
        : newVal;
      onChange?.(tzDate);
    };

    useBackdropClick(
      () => {
        setOpen(false);
      },
      [inputRef, menuRef],
      isOpen,
    );

    const handleInputChange = (inputVal: Date | null) => {
      console.log('InputChange', { inputVal });
      updateValue(inputVal);
      debugger;
    };

    const handleCellClick = (cellValue: Date) => {
      updateValue(cellValue);
      setOpen(false);
    };

    const handleMonthChange = (newMonth: Date) => {
      setMonth(newMonth);
    };

    return (
      <DatePickerProvider value={rest}>
        <DatePickerInput
          ref={inputRef}
          value={toDate(value)}
          setValue={handleInputChange}
          onClick={() => {
            // TODO: Set focus to appropriate segment
            setOpen(true);
          }}
        />
        <DatePickerMenu
          refEl={inputRef}
          ref={menuRef}
          value={timeZonedValue}
          isOpen={isOpen}
          month={month}
          onCellClick={handleCellClick}
          onMonthChange={handleMonthChange}
          usePortal={true}
        />
      </DatePickerProvider>
    );
  },
);

DatePicker.displayName = 'DatePicker';
