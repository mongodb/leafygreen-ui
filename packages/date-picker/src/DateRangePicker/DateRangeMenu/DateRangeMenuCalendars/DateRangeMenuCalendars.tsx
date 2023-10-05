import React, { forwardRef } from 'react';

import { Subtitle } from '@leafygreen-ui/typography';

import { CalendarCell, CalendarGrid } from '../../../Calendar';
import {
  getFullMonthLabel,
  getMonthName,
  getUTCDateString,
  isSameUTCDay,
} from '../../../utils';
import { useDateRangeMenuContext } from '../DateRangeMenuContext';

import { calendarsFrameStyles } from './DateRangeMenuCalendars.styles';

export const DateRangeMenuCalendars = forwardRef<HTMLDivElement, {}>(() => {
  const {
    startMonth,
    // setStartMonth,
    startCellRefs,
    endMonth,
    // setEndMonth,
    endCellRefs,
    today,
  } = useDateRangeMenuContext();

  return (
    <div className={calendarsFrameStyles}>
      {/* TODO: Month labels & chevrons */}
      {/* <Subtitle>{getMonthName(startMonth.getUTCMonth()).long}</Subtitle>
      <Subtitle>{getMonthName(endMonth.getUTCMonth()).long}</Subtitle> */}

      <CalendarGrid
        // ref={startCalendarRef}
        month={startMonth}
        // className={menuCalendarGridStyles}
        // onKeyDown={handleCalendarKeyDown}
        aria-label={getFullMonthLabel(startMonth)}
      >
        {(day, i) => (
          <CalendarCell
            key={i}
            ref={startCellRefs(day.toISOString())}
            aria-label={getUTCDateString(day)}
            // isHighlighted={isSameUTCDay(day, highlight)}
            isCurrent={isSameUTCDay(day, today)}
            // state={getCellState(day)}
            // onClick={cellClickHandlerForDay(day)}
            data-iso={day.toISOString()}
          >
            {day.getUTCDate()}
          </CalendarCell>
        )}
      </CalendarGrid>

      <CalendarGrid
        // ref={endCalendarRef}
        month={endMonth}
        // className={menuCalendarGridStyles}
        // onKeyDown={handleCalendarKeyDown}
        aria-label={getFullMonthLabel(endMonth)}
      >
        {(day, i) => (
          <CalendarCell
            key={i}
            ref={endCellRefs(day.toISOString())}
            aria-label={getUTCDateString(day)}
            // isHighlighted={isSameUTCDay(day, highlight)}
            isCurrent={isSameUTCDay(day, today)}
            // state={getCellState(day)}
            // onClick={cellClickHandlerForDay(day)}
            data-iso={day.toISOString()}
          >
            {day.getUTCDate()}
          </CalendarCell>
        )}
      </CalendarGrid>
    </div>
  );
});

DateRangeMenuCalendars.displayName = 'DateRangeMenuCalendars';
