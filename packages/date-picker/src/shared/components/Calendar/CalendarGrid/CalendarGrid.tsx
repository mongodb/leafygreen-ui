import React, { forwardRef, useMemo } from 'react';
import range from 'lodash/range';
import { getWeekStartByLocale } from 'weekstart';

import { cx } from '@leafygreen-ui/emotion';
import { Disclaimer } from '@leafygreen-ui/typography';

import { DaysOfWeek, daysPerWeek } from '../../../constants';
import { getWeeksArray } from '../../../utils';
import { useDatePickerContext } from '../../DatePickerContext';

import {
  calendarGridStyles,
  calendarHeaderCellStyles,
  calendarThStyles,
} from './CalendarGrid.styles';
import { CalendarGridProps } from './CalendarGrid.types';

/**
 * A simple table that renders the `CalendarCell` components passed as children
 *
 * Accepts a mapped render function as children.
 *
 * Example usage:
 * ```tsx
 * // Renders the current month
 * <CalendarGrid month={new Date()}>
 *    {(day) => (
 *      <CalendarCell>
 *        {day.getUTCDate()}
 *      </CalendarCell>
 *    )}
 * </CalendarGrid>
 * ```
 *
 */
export const CalendarGrid = forwardRef<HTMLTableElement, CalendarGridProps>(
  ({ month, children, className, ...rest }: CalendarGridProps, fwdRef) => {
    const { dateFormat } = useDatePickerContext();
    const weekStartsOn = getWeekStartByLocale(dateFormat);
    const weeks = useMemo(
      () => getWeeksArray(month, { dateFormat }),
      [dateFormat, month],
    );

    return (
      <table
        {...rest}
        role="grid"
        ref={fwdRef}
        className={cx(calendarGridStyles, className)}
      >
        <thead>
          <tr role="row">
            {range(daysPerWeek).map(i => {
              const dayIndex = (i + weekStartsOn) % daysPerWeek;
              const day = DaysOfWeek[dayIndex];
              return (
                <th
                  role="columnheader"
                  key={day.short}
                  abbr={day.long}
                  className={calendarThStyles}
                >
                  <Disclaimer className={calendarHeaderCellStyles}>
                    {day.short}
                  </Disclaimer>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, w) => (
            <tr key={`week-${w}`} role="row">
              {week.map((day, d) => {
                const index: number = w * daysPerWeek + d;
                return day ? (
                  children(day, index)
                ) : (
                  // eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
                  <td key={`null-${index}`} role="none"></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
);

CalendarGrid.displayName = 'CalendarGrid';
