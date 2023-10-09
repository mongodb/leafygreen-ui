import React, { forwardRef, KeyboardEventHandler, useState } from 'react';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { Subtitle } from '@leafygreen-ui/typography';

import {
  CalendarCell,
  CalendarCellState,
  CalendarGrid,
} from '../../../Calendar';
import { useDatePickerContext } from '../../../DatePickerContext';
import { DateType } from '../../../types';
import {
  getFullMonthLabel,
  getUTCDateString,
  isSameUTCDay,
  isSameUTCMonth,
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
>(({ value, onCellClick }) => {
  const { isInRange } = useDatePickerContext();
  const {
    month,
    nextMonth,
    setMonth: setDisplayMonth,
    startCellRefs,
    endCellRefs,
    today,
  } = useDateRangeMenuContext();

  const [highlight, setHighlight] = useState<DateType>(
    value ? value[0] : today,
  );

  /** setDisplayMonth with side effects */
  const updateMonth = (newMonth: Date) => {
    if (isSameUTCMonth(newMonth, month)) {
      return;
    }

    // const newHighlight = getNewHighlight(highlight, month, newMonth);
    // const shouldUpdateHighlight = !isSameUTCDay(highlight, newHighlight);

    // if (newHighlight && shouldUpdateHighlight) {
    //   setHighlight(newHighlight);
    // }

    setDisplayMonth(newMonth);
  };

  /** setHighlight with side effects */
  const updateHighlight = (newHighlight: Date) => {
    // change month if nextHighlight is different than `month` or `nextMonth`
    if (
      !isSameUTCMonth(month, newHighlight) &&
      !isSameUTCMonth(nextMonth, newHighlight)
    ) {
      setDisplayMonth(newHighlight);
    }

    // keep track of the highlighted cell
    setHighlight(newHighlight);
  };

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
  const handleCalendarKeyDown: KeyboardEventHandler<HTMLTableElement> = e => {
    // TODO:
  };

  return (
    <div className={calendarsFrameStyles}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={calendarsContainerStyles}
        onKeyDown={handleCalendarKeyDown}
      >
        <CalendarGrid month={month} aria-label={getFullMonthLabel(month)}>
          {(day, i) => (
            <CalendarCell
              key={i}
              ref={startCellRefs(day.toISOString())}
              aria-label={getUTCDateString(day)}
              isHighlighted={isSameUTCDay(day, highlight)}
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
          aria-label={getFullMonthLabel(nextMonth)}
        >
          {(day, i) => (
            <CalendarCell
              key={i}
              ref={endCellRefs(day.toISOString())}
              aria-label={getUTCDateString(day)}
              isHighlighted={isSameUTCDay(day, highlight)}
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
