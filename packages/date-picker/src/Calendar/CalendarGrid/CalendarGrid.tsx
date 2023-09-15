import React, { useMemo } from 'react';
import { range } from 'lodash';
import { getWeekStartByLocale } from 'weekstart';

import { Disclaimer } from '@leafygreen-ui/typography';

import { DaysOfWeek, daysPerWeek } from '../../constants';
import { useDatePickerContext } from '../../DatePickerContext';
import { getWeeksArray } from '../../utils/getWeeksArray';

import { calendarHeaderCellStyles } from './CalendarGrid.styles';
import { CalendarGridProps } from './CalendarGrid.types';

/**
 * A simple table that renders the `CalendarCell` components passed as children
 */
export function CalendarGrid({ month, children, ...rest }: CalendarGridProps) {
  const { dateFormat } = useDatePickerContext();
  const weekStartsOn = getWeekStartByLocale(dateFormat);
  const weeks = useMemo(
    () => getWeeksArray(month, { dateFormat }),
    [dateFormat, month],
  );

  return (
    <table {...rest}>
      <thead>
        <tr>
          {range(daysPerWeek).map(i => {
            const dayIndex = (i + weekStartsOn) % daysPerWeek;
            const day = DaysOfWeek[dayIndex];
            return (
              <th key={day.short} abbr={day.long}>
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
          <tr key={`week-${w}`}>
            {week.map((day, d) => {
              const index: number = w * daysPerWeek + d;
              return day ? (
                children(day, index)
              ) : (
                <td key={`null-${index}`}></td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CalendarGrid.displayName = 'CalendarGrid';
