import React, { forwardRef } from 'react';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { Subtitle } from '@leafygreen-ui/typography';

import { CalendarCell, CalendarGrid } from '../../../Calendar';
import {
  getFullMonthLabel,
  getUTCDateString,
  isSameUTCDay,
} from '../../../utils';
import { useDateRangeMenuContext } from '../DateRangeMenuContext';

import {
  calendarHeadersContainerStyle,
  calendarHeaderStyles,
  calendarsContainerStyles,
  calendarsFrameStyles,
} from './DateRangeMenuCalendars.styles';

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
      <div className={calendarsContainerStyles}>
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

      <div className={calendarHeadersContainerStyle}>
        <div className={calendarHeaderStyles}>
          <IconButton aria-label="Previous month">
            <Icon glyph="ChevronLeft" />
          </IconButton>
          <Subtitle>{getFullMonthLabel(startMonth)}</Subtitle>
        </div>

        <div className={calendarHeaderStyles}>
          <Subtitle>{getFullMonthLabel(endMonth)}</Subtitle>
          <IconButton aria-label="Next month">
            <Icon glyph="ChevronRight" />
          </IconButton>
        </div>
      </div>
    </div>
  );
});

DateRangeMenuCalendars.displayName = 'DateRangeMenuCalendars';
