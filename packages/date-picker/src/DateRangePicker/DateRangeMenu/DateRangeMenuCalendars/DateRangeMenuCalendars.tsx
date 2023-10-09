import React, { forwardRef, KeyboardEventHandler } from 'react';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { Subtitle } from '@leafygreen-ui/typography';

import {
  CalendarCell,
  CalendarCellState,
  CalendarGrid,
} from '../../../Calendar';
import { useDatePickerContext } from '../../../DatePickerContext';
import {
  getFullMonthLabel,
  getUTCDateString,
  isSameUTCDay,
} from '../../../utils';
import { DateRangeMenuProps } from '../DateRangeMenu.types';
import { useDateRangeMenuContext } from '../DateRangeMenuContext';

import {
  calendarHeadersContainerStyle,
  calendarHeaderStyles,
  calendarsContainerStyles,
  calendarsFrameStyles,
} from './DateRangeMenuCalendars.styles';

export const DateRangeMenuCalendars = forwardRef<
  HTMLDivElement,
  DateRangeMenuProps
>(({ onCellClick }) => {
  const { isInRange } = useDatePickerContext();

  const { month, nextMonth, startCellRefs, endCellRefs, today } =
    useDateRangeMenuContext();

  /** Creates a click handler for a specific cell date */
  const cellClickHandlerForDay = (day: Date) => () => {
    if (isInRange(day)) {
      onCellClick(day);
    }
  };

  /** Returns the current state of the cell */
  const getCellState = (cellDay: Date | null): CalendarCellState => {
    // TODO:
    return CalendarCellState.Default;
  };

  /** Called on any keydown within the menu element */
  const handleCalendarKeyDown: KeyboardEventHandler<HTMLTableElement> = e => {};

  return (
    <div className={calendarsFrameStyles}>
      <div className={calendarsContainerStyles}>
        <CalendarGrid
          month={month}
          onKeyDown={handleCalendarKeyDown}
          aria-label={getFullMonthLabel(month)}
        >
          {(day, i) => (
            <CalendarCell
              key={i}
              ref={startCellRefs(day.toISOString())}
              aria-label={getUTCDateString(day)}
              // isHighlighted={isSameUTCDay(day, highlight)}
              isCurrent={isSameUTCDay(day, today)}
              state={getCellState(day)}
              onClick={cellClickHandlerForDay(day)}
              data-iso={day.toISOString()}
            >
              {day.getUTCDate()}
            </CalendarCell>
          )}
        </CalendarGrid>

        <CalendarGrid
          month={nextMonth}
          // onKeyDown={handleCalendarKeyDown}
          aria-label={getFullMonthLabel(nextMonth)}
        >
          {(day, i) => (
            <CalendarCell
              key={i}
              ref={endCellRefs(day.toISOString())}
              aria-label={getUTCDateString(day)}
              // isHighlighted={isSameUTCDay(day, highlight)}
              isCurrent={isSameUTCDay(day, today)}
              state={getCellState(day)}
              onClick={cellClickHandlerForDay(day)}
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
          <Subtitle>{getFullMonthLabel(month)}</Subtitle>
        </div>

        <div className={calendarHeaderStyles}>
          <Subtitle>{getFullMonthLabel(nextMonth)}</Subtitle>
          <IconButton aria-label="Next month">
            <Icon glyph="ChevronRight" />
          </IconButton>
        </div>
      </div>
    </div>
  );
});

DateRangeMenuCalendars.displayName = 'DateRangeMenuCalendars';
