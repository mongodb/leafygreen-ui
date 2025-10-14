import React, { forwardRef, MouseEventHandler } from 'react';

import {
  getMonthName,
  isSameUTCMonth,
  setUTCMonth,
} from '@leafygreen-ui/date-utils';
import { SupportedLocales } from '@leafygreen-ui/date-utils';
import { Icon } from '@leafygreen-ui/icon';
import { IconButton } from '@leafygreen-ui/icon-button';
import { isDefined } from '@leafygreen-ui/lib';

import { useSharedDatePickerContext } from '../../../shared/context';
import { useDatePickerContext } from '../../DatePickerContext';
import {
  menuHeaderSelectContainerStyles,
  menuHeaderStyles,
} from '../DatePickerMenu.styles';
import {
  DatePickerMenuSelectMonth,
  DatePickerMenuSelectYear,
} from '../DatePickerMenuSelect';

import { shouldChevronBeDisabled } from './utils';

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
  const { min, max, isInRange, locale } = useSharedDatePickerContext();
  const { refs, month } = useDatePickerContext();

  const updateMonth = (newMonth: Date) => {
    // We don't do any checks here.
    // If the month is out of range, we still display it
    setMonth(newMonth);
  };

  const isIsoFormat = locale === SupportedLocales.ISO_8601;

  const formatMonth = (date: Date) => {
    const monthName = getMonthName(date.getUTCMonth(), locale);
    const year = date.getUTCFullYear().toString();
    return `${monthName.long} ${year}`;
  };

  /**
   * If the month is not in range and is not the last valid month
   * e.g.
   * This is not in range and is not the last valid month
   * min: new Date(Date.UTC(2038, Month.March, 19));
   * current month date: new Date(Date.UTC(2038, Month.Feburary, 19));
   *
   * This is not in range but it is the last valid month
   * min: new Date(Date.UTC(2038, Month.March, 19));
   * current month date: new Date(Date.UTC(2038, Month.March, 18));
   */
  const isMonthInvalid = (dir: 'left' | 'right') => {
    const isOnLastValidMonth = isSameUTCMonth(
      month,
      dir === 'left' ? max : min,
    );
    const isDateInRange = isInRange(month);

    return !isDateInRange && !isOnLastValidMonth;
  };

  /**
   * Given a direction (left/right), computes the nearest valid adjacent month
   *
   * @example
   * max: new Date(Date.UTC(2038, Month.January, 19));
   * current month date: new Date(Date.UTC(2038, Month.March, 19));
   * `left` chevron will change the month back to January 2038
   *
   * @example
   * min: new Date(Date.UTC(1970, Month.January, 1));
   * current month date: new Date(Date.UTC(1969, Month.November, 19));
   * "right" chevron will change the month back to January 1970
   */
  const getNewMonth = (dir: 'left' | 'right'): Date => {
    if (isMonthInvalid(dir)) {
      const closestValidDate = dir === 'left' ? max : min;
      const newMonthIndex = closestValidDate.getUTCMonth();
      const newMonth = setUTCMonth(closestValidDate, newMonthIndex);
      return newMonth;
    } else {
      const increment = dir === 'left' ? -1 : 1;
      const newMonthIndex = month.getUTCMonth() + increment;
      const newMonth = setUTCMonth(month, newMonthIndex);
      return newMonth;
    }
  };

  const getChevronButtonLabel = (dir: 'left' | 'right') => {
    const dirLabel = dir === 'left' ? 'Previous' : 'Next';
    const isNewMonthInvalid = isMonthInvalid(dir);
    const newMonth = getNewMonth(dir);
    const newMonthString = formatMonth(newMonth);
    return [
      dirLabel,
      isNewMonthInvalid ? 'valid ' : undefined,
      'month',
      `(${newMonthString})`,
    ]
      .filter(isDefined)
      .join(' ');
  };

  /**
   * Calls the `updateMonth` helper with the appropriate month when a Chevron is clicked
   */
  const handleChevronClick =
    (dir: 'left' | 'right'): MouseEventHandler<HTMLButtonElement> =>
    e => {
      e.stopPropagation();
      e.preventDefault();
      const newMonth = getNewMonth(dir);
      updateMonth(newMonth);
    };

  return (
    <div ref={fwdRef} className={menuHeaderStyles} {...rest}>
      <IconButton
        ref={refs.chevronButtonRefs.left}
        data-testid="lg-date_picker-menu-prev_month_button"
        aria-label={getChevronButtonLabel('left')}
        disabled={shouldChevronBeDisabled('left', month, min)}
        onClick={handleChevronClick('left')}
      >
        <Icon glyph="ChevronLeft" />
      </IconButton>
      <div className={menuHeaderSelectContainerStyles}>
        {isIsoFormat ? (
          <>
            <DatePickerMenuSelectYear updateMonth={updateMonth} />
            <DatePickerMenuSelectMonth updateMonth={updateMonth} />
          </>
        ) : (
          <>
            <DatePickerMenuSelectMonth updateMonth={updateMonth} />
            <DatePickerMenuSelectYear updateMonth={updateMonth} />
          </>
        )}
      </div>
      <IconButton
        ref={refs.chevronButtonRefs.right}
        data-testid="lg-date_picker-menu-next_month_button"
        aria-label={getChevronButtonLabel('right')}
        disabled={shouldChevronBeDisabled('right', month, max)}
        onClick={handleChevronClick('right')}
      >
        <Icon glyph="ChevronRight" />
      </IconButton>
    </div>
  );
});

DatePickerMenuHeader.displayName = 'DatePickerMenuHeader';
