import React, { forwardRef, MouseEventHandler } from 'react';
import range from 'lodash/range';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { Option, Select } from '@leafygreen-ui/select';

import { useDatePickerContext } from '../../../shared/components/DatePickerContext';
import { Months, selectElementProps } from '../../../shared/constants';
import { isSameUTCMonth, setUTCMonth, setUTCYear } from '../../../shared/utils';
import { useSingleDateContext } from '../../SingleDateContext';
import {
  menuHeaderSelectContainerStyles,
  menuHeaderStyles,
  selectInputWidthStyles,
  selectTruncateStyles,
} from '../DatePickerMenu.styles';

import { shouldMonthBeEnabled } from './utils/getMonthOptions';

interface DatePickerMenuHeaderProps {
  setMonth: (newMonth: Date) => void;
}

/**
 * A helper component for DatePickerMenu.
 * Tests for this component are in DatePickerMenu
 * @internal
 */
export const DatePickerMenuHeader = forwardRef<
  HTMLDivElement,
  DatePickerMenuHeaderProps
>(({ setMonth, ...rest }: DatePickerMenuHeaderProps, fwdRef) => {
  const { min, max, setIsSelectOpen, isInRange } = useDatePickerContext();
  const { month } = useSingleDateContext();

  const yearOptions = range(min.getUTCFullYear(), max.getUTCFullYear() + 1);

  const updateMonth = (newMonth: Date) => {
    // We don't do any checks here.
    // If the month is out of range, we still display it
    setMonth(newMonth);
  };

  /**
   * Checks if chevron should be disabled
   *
   *
   * @param direction
   * @param day1
   * @param day2
   * @returns
   */
  const isChevronDisabled = (
    direction: 'left' | 'right',
    day1?: Date | null, // month
    day2?: Date | null, // min/max
  ): boolean => {
    if (!day1 || !day2) return false;

    if (direction === 'right') {
      return day1 >= day2 || isSameUTCMonth(day1, day2);
    }

    return day1 <= day2 || isSameUTCMonth(day1, day2);
  };

  /**
   * Calls the `updateMonth` helper with the appropriate month when a Chevron is clicked
   */
  const handleChevronClick =
    (dir: 'left' | 'right'): MouseEventHandler<HTMLButtonElement> =>
    e => {
      e.stopPropagation();
      e.preventDefault();

      const isOnLastValidMonth = isSameUTCMonth(
        month,
        dir === 'left' ? max : min,
      );

      const isDateInRange = isInRange(month);

      if (!isDateInRange && !isOnLastValidMonth) {
        console.log('😈😈😈😈needs to go to the next valid month');
        const newDate = dir === 'left' ? max : min;
        const newMonthIndex = newDate.getUTCMonth();
        const newMonth = setUTCMonth(newDate, newMonthIndex);
        updateMonth(newMonth);
      } else {
        const increment = dir === 'left' ? -1 : 1;
        const newMonthIndex = month.getUTCMonth() + increment;
        const newMonth = setUTCMonth(month, newMonthIndex);
        updateMonth(newMonth);
      }
    };

  /** Returns whether the provided month should be enabled */
  const isMonthEnabled = (monthName: string) =>
    shouldMonthBeEnabled(monthName, { month, min, max });

  return (
    <div ref={fwdRef} className={menuHeaderStyles} {...rest}>
      <IconButton
        aria-label="Previous month"
        disabled={isChevronDisabled('left', month, min)}
        onClick={handleChevronClick('left')}
      >
        <Icon glyph="ChevronLeft" />
      </IconButton>
      <div className={menuHeaderSelectContainerStyles}>
        <Select
          {...selectElementProps}
          aria-label="Select month"
          value={month.getUTCMonth().toString()}
          onChange={m => {
            const newMonth = setUTCMonth(month, Number(m));
            updateMonth(newMonth);
          }}
          className={cx(selectTruncateStyles, selectInputWidthStyles)}
          onEntered={() => setIsSelectOpen(true)}
          onExited={() => setIsSelectOpen(false)}
          placeholder={Months[month.getUTCMonth()].short}
        >
          {Months.map((m, i) => (
            <Option
              disabled={!isMonthEnabled(m.long)}
              value={i.toString()}
              key={m.short}
              aria-label={m.long}
            >
              {m.short}
            </Option>
          ))}
        </Select>
        <Select
          {...selectElementProps}
          aria-label="Select year"
          value={month.getUTCFullYear().toString()}
          onChange={y => {
            const newMonth = setUTCYear(month, Number(y));
            updateMonth(newMonth);
          }}
          className={cx(selectTruncateStyles, selectInputWidthStyles)}
          onEntered={() => setIsSelectOpen(true)}
          onExited={() => setIsSelectOpen(false)}
          placeholder={month.getUTCFullYear().toString()}
        >
          {yearOptions.map(y => (
            <Option value={y.toString()} key={y} aria-label={y.toString()}>
              {y}
            </Option>
          ))}
        </Select>
      </div>
      <IconButton
        aria-label="Next month"
        disabled={isChevronDisabled('right', month, max)}
        onClick={handleChevronClick('right')}
      >
        <Icon glyph="ChevronRight" />
      </IconButton>
    </div>
  );
});

DatePickerMenuHeader.displayName = 'DatePickerMenuHeader';
