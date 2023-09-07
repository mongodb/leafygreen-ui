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
            const d = DaysOfWeek[dayIndex];
            return (
              <th key={d.short} abbr={d.long}>
                <Disclaimer className={calendarHeaderCellStyles}>
                  {d.short}
                </Disclaimer>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, w) => (
          <tr key={w}>
            {week.map((day, d) => {
              return day ? (
                children(day, w * daysPerWeek + d)
              ) : (
                <td key=""></td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CalendarGrid.displayName = 'CalendarGrid';
