import React, { forwardRef, KeyboardEventHandler, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
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
import { useDateRangeMenuContext } from '../DateRangeMenuContext';

import {
  calendarHeadersContainerStyle,
  calendarHeaderStyles,
  calendarsClassName,
  calendarsContainerStyles,
  calendarsFrameStyles,
} from './DateRangeMenuCalendars.styles';
import { DateRangeMenuCalendarsProps } from './DateRangeMenuCalendars.types';

export const DateRangeMenuCalendars = forwardRef<
  HTMLDivElement,
  DateRangeMenuCalendarsProps
>(
  (
    { value, setValue, highlight, setHighlight, cellRefs, chevronRefs },
    fwdRef,
  ) => {
    const { isInRange } = useDatePickerContext();
    const {
      month,
      nextMonth,
      setMonth: setDisplayMonth,
      today,
    } = useDateRangeMenuContext();

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
        // TODO:
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
      <div
        ref={fwdRef}
        className={cx(calendarsClassName, calendarsFrameStyles)}
      >
        <div className={calendarHeadersContainerStyle}>
          <div className={calendarHeaderStyles}>
            <IconButton aria-label="Previous month" ref={chevronRefs('left')}>
              <Icon glyph="ChevronLeft" />
            </IconButton>
            <Subtitle>{getFullMonthLabel(month)}</Subtitle>
          </div>

          <div className={calendarHeaderStyles}>
            <Subtitle>{getFullMonthLabel(nextMonth)}</Subtitle>
            <IconButton aria-label="Next month" ref={chevronRefs('right')}>
              <Icon glyph="ChevronRight" />
            </IconButton>
          </div>
        </div>

        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className={calendarsContainerStyles}
          onKeyDown={handleCalendarKeyDown}
        >
          <CalendarGrid month={month} aria-label={getFullMonthLabel(month)}>
            {(day, i) => (
              <CalendarCell
                key={i}
                ref={cellRefs(day.toISOString())}
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
                ref={cellRefs(day.toISOString())}
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
      </div>
    );
  },
);

DateRangeMenuCalendars.displayName = 'DateRangeMenuCalendars';
