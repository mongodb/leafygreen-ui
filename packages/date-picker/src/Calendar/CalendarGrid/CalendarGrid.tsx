import React from 'react';
import { range } from 'lodash';
import { getWeekStartByLocale } from 'weekstart';

import { Disclaimer } from '@leafygreen-ui/typography';

import { useDatePickerContext } from '../../DatePickerContext';

import { calendarHeaderCellStyles } from './CalendarGrid.styles';
import {
  CalendarGridProps,
  DaysOfWeek,
  daysPerWeek,
} from './CalendarGrid.types';
import { getWeeksArray } from './utils';

/**
 * A simple table that renders the `CalendarCell` components passed as children
 */
export function CalendarGrid({
  month = new Date(),
  children,
  ...rest
}: CalendarGridProps) {
  const { dateFormat } = useDatePickerContext();
  const weekStartsOn = getWeekStartByLocale(dateFormat);
  const weeks = getWeeksArray(month, dateFormat);

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
              return day ? children(day, w * daysPerWeek + d) : <td></td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CalendarGrid.displayName = 'CalendarGrid';
