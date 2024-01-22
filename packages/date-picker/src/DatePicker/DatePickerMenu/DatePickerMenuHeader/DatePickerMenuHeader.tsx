import React, { forwardRef, MouseEventHandler, useCallback } from 'react';
import range from 'lodash/range';

import {
  getLocaleMonths,
  isSameUTCMonth,
  setUTCMonth,
  setUTCYear,
} from '@leafygreen-ui/date-utils';
import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { Option, Select } from '@leafygreen-ui/select';

import { selectElementProps } from '../../../shared/constants';
import { useSharedDatePickerContext } from '../../../shared/context';
import { useDatePickerContext } from '../../DatePickerContext';
import {
  menuHeaderSelectContainerStyles,
  menuHeaderStyles,
  selectInputWidthStyles,
  selectTruncateStyles,
} from '../DatePickerMenu.styles';
import {
  DatePickerMenuSelectMonth,
  DatePickerMenuSelectYear,
} from '../DatePickerMenuSelect';

import { shouldChevronBeDisabled, shouldMonthBeEnabled } from './utils';

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
  const { min, max, locale, isInRange } = useSharedDatePickerContext();
  const { refs, month } = useDatePickerContext();

  const updateMonth = (newMonth: Date) => {
    // We don't do any checks here.
    // If the month is out of range, we still display it
    setMonth(newMonth);
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
  const isMonthInValid = (dir: 'left' | 'right') => {
    const isOnLastValidMonth = isSameUTCMonth(
      month,
      dir === 'left' ? max : min,
    );
    const isDateInRange = isInRange(month);

    return !isDateInRange && !isOnLastValidMonth;
  };

  /**
   * Calls the `updateMonth` helper with the appropriate month when a Chevron is clicked
   */
  const handleChevronClick =
    (dir: 'left' | 'right'): MouseEventHandler<HTMLButtonElement> =>
    e => {
      e.stopPropagation();
      e.preventDefault();

      // e.g.
      // max: new Date(Date.UTC(2038, Month.January, 19));
      // current month date: new Date(Date.UTC(2038, Month.March, 19));
      // left chevron will change the month back to January 2038
      // e.g.
      // min: new Date(Date.UTC(1970, Month.January, 1));
      // current month date: new Date(Date.UTC(1969, Month.November, 19));
      // right chevron will change the month back to January 1970
      if (isMonthInValid(dir)) {
        const closestValidDate = dir === 'left' ? max : min;
        const newMonthIndex = closestValidDate.getUTCMonth();
        const newMonth = setUTCMonth(closestValidDate, newMonthIndex);
        updateMonth(newMonth);
      } else {
        const increment = dir === 'left' ? -1 : 1;
        const newMonthIndex = month.getUTCMonth() + increment;
        const newMonth = setUTCMonth(month, newMonthIndex);
        updateMonth(newMonth);
      }
    };

  //TODO: move to utils
  const yearFirstFormats = ['iso8601'];
  const isYearFirstFormat = yearFirstFormats.includes(locale);

  const handleMonthOnChange = (value: string) => {
    const newMonth = setUTCMonth(month, Number(value));
    updateMonth(newMonth);
  };

  const handleYearOnChange = (value: string) => {
    const newMonth = setUTCYear(month, Number(value));
    updateMonth(newMonth);
  };

  return (
    <div ref={fwdRef} className={menuHeaderStyles} {...rest}>
      <IconButton
        ref={refs.chevronButtonRefs.left}
        aria-label={
          isMonthInValid('left') ? 'Previous valid month' : 'Previous month'
        }
        disabled={shouldChevronBeDisabled('left', month, min)}
        onClick={handleChevronClick('left')}
      >
        <Icon glyph="ChevronLeft" />
      </IconButton>
      <div className={menuHeaderSelectContainerStyles}>
        {isYearFirstFormat ? (
          <>
            <DatePickerMenuSelectYear onChange={handleYearOnChange} />
            <DatePickerMenuSelectMonth onChange={handleMonthOnChange} />
          </>
        ) : (
          <>
            <DatePickerMenuSelectMonth onChange={handleMonthOnChange} />
            <DatePickerMenuSelectYear onChange={handleYearOnChange} />
          </>
        )}
      </div>
      <IconButton
        ref={refs.chevronButtonRefs.right}
        aria-label={isMonthInValid('right') ? 'Next valid month' : 'Next month'}
        disabled={shouldChevronBeDisabled('right', month, max)}
        onClick={handleChevronClick('right')}
      >
        <Icon glyph="ChevronRight" />
      </IconButton>
    </div>
  );
});

DatePickerMenuHeader.displayName = 'DatePickerMenuHeader';
