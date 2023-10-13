import React, {
  forwardRef,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  useState,
} from 'react';
import { isAfter, isBefore, isWithinInterval, max, min } from 'date-fns';
import { isNull, isUndefined } from 'lodash';

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

// TODO: move to utils
const minDate = (datesArray: Array<DateType>): Date | undefined => {
  const filteredDates = datesArray.filter(d => !isNull(d)) as Array<Date>;

  if (filteredDates.length > 0) {
    return min(filteredDates);
  }
};

// TODO: move to utils
const maxDate = (datesArray: Array<DateType>): Date | undefined => {
  const filteredDates = datesArray.filter(d => !isNull(d)) as Array<Date>;

  if (filteredDates.length > 0) {
    return max(filteredDates);
  }
};

// TODO: move to utils
const isOnOrBefore = (day: Date, dayToCompare: Date) => {
  return isSameUTCDay(day, dayToCompare) || isBefore(day, dayToCompare);
};

// TODO: move to utils
const isOnOrAfter = (day: Date, dayToCompare: Date) => {
  return isSameUTCDay(day, dayToCompare) || isAfter(day, dayToCompare);
};

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

    const [hoveredCell, setHover] = useState<DateType>(null);

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
    const getCellState = (cellDay: Date): CalendarCellState => {
      if (!isInRange(cellDay)) {
        return CalendarCellState.Disabled;
      }

      // if at least the start/end date is defined...
      if (value && value.some(v => !isNull(v))) {
        // for the purposes of visualizing the calendar,
        // the range start is the earliest date of the hovered cell,
        // or the start/end value
        const rangeStart = minDate([...value, hoveredCell]);
        // same for range end
        const rangeEnd = maxDate([...value, hoveredCell]);

        // if this cell is the first of `value`
        // and it is _before_ the hovered cell
        if (
          isSameUTCDay(cellDay, minDate(value)) &&
          (!hoveredCell || isOnOrBefore(cellDay, hoveredCell))
        ) {
          return CalendarCellState.Start;
        }

        // if this cell is the last of `value`
        // and it is _after_ the hovered cell
        if (
          isSameUTCDay(cellDay, maxDate(value)) &&
          (!hoveredCell || isOnOrAfter(cellDay, hoveredCell))
        ) {
          return CalendarCellState.End;
        }

        // otherwise if the current cell is within the range of start & end
        if (
          !isUndefined(rangeStart) &&
          !isUndefined(rangeEnd) &&
          isWithinInterval(cellDay, { start: rangeStart, end: rangeEnd })
        ) {
          return CalendarCellState.Range;
        }
      }

      return CalendarCellState.Default;
    };

    /** Called on any keydown within the menu element */
    const handleCalendarKeyDown: KeyboardEventHandler<HTMLTableElement> = e => {
      // TODO:
    };

    const handleCellHover =
      (day: Date): MouseEventHandler<HTMLTableCellElement> =>
      e => {
        setHover(day);
      };

    const handleCalendarMouseOut: MouseEventHandler<HTMLDivElement> = e => {
      // TODO: improve this logiv
      if (e.target === e.currentTarget) {
        // ... if the calendar container is the event's target
        setHover(null);
      }
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

        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/mouse-events-have-key-events */}
        <div
          className={calendarsContainerStyles}
          onKeyDown={handleCalendarKeyDown}
          onMouseOut={handleCalendarMouseOut}
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
                onMouseEnter={handleCellHover(day)}
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
                onMouseEnter={handleCellHover(day)}
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
