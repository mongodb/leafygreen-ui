import React, {
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import { isWithinInterval } from 'date-fns';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { Subtitle } from '@leafygreen-ui/typography';

import {
  CalendarCell,
  CalendarCellState,
  CalendarGrid,
} from '../../../Calendar';
import { CalendarCellRangeState } from '../../../Calendar/CalendarCell';
import { useDatePickerContext } from '../../../DatePickerContext';
import { DateRangeType, DateType } from '../../../types';
import {
  getFullMonthLabel,
  getUTCDateString,
  isDefined,
  isSameUTCDay,
  isSameUTCMonth,
  maxDate,
  minDate,
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
        // if no value is set, set the start date
        if (!value || value.every(isNull)) {
          setValue([day, null]);
        } else if (value.some(isNull)) {
          // if only one date is set, set both dates
          const newRange: DateRangeType = [
            minDate([...value, day]) ?? day,
            maxDate([...value, day]) ?? day,
          ];
          setValue(newRange);
        } else if (value.every(isDefined)) {
          // if both values are set, set the start date & clear the end date
          setValue([day, null]);
        }
      }
    };

    /** Returns the current state of the cell */
    const getCellState = (cellDay: Date): CalendarCellState => {
      if (!isInRange(cellDay)) {
        return CalendarCellState.Disabled;
      }

      // if at least the start/end date is defined...
      if (value && value.some(isDefined)) {
        if (
          isSameUTCDay(cellDay, minDate(value)) ||
          isSameUTCDay(cellDay, maxDate(value))
        ) {
          return CalendarCellState.Active;
        }
      }

      return CalendarCellState.Default;
    };

    const getCellRangeState = (cellDay: Date): CalendarCellRangeState => {
      // if at least the start/end date is defined...
      if (value && value.some(isDefined)) {
        // for the purposes of visualizing the calendar,
        // the range start is the earliest/latest date of the start/end value or hovered cell,
        const rangeStart = minDate([...value, hoveredCell]);
        const rangeEnd = maxDate([...value, hoveredCell]);

        if (isSameUTCDay(cellDay, rangeStart)) {
          return CalendarCellRangeState.Start;
        }

        if (isSameUTCDay(cellDay, rangeEnd)) {
          return CalendarCellRangeState.End;
        }

        // otherwise if the current cell is within the range of start & end
        if (
          !isUndefined(rangeStart) &&
          !isUndefined(rangeEnd) &&
          isWithinInterval(cellDay, { start: rangeStart, end: rangeEnd })
        ) {
          return CalendarCellRangeState.Range;
        }
      }

      return CalendarCellRangeState.None;
    };

    /** Called on any keydown within the menu element */
    const handleCalendarKeyDown: KeyboardEventHandler<HTMLTableElement> = e => {
      // TODO: Arrow keys
    };

    const handleCellHover =
      (day: Date): MouseEventHandler<HTMLTableCellElement> =>
      _ => {
        setHover(day);
      };

    const handleCalendarMouseOut: MouseEventHandler<HTMLDivElement> = e => {
      // TODO: improve this logic
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
                rangeState={getCellRangeState(day)}
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
                rangeState={getCellRangeState(day)}
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
