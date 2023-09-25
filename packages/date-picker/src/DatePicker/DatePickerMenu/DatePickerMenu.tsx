import React, {
  forwardRef,
  KeyboardEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react';
import { addDays, isAfter, subDays } from 'date-fns';

import { useDynamicRefs } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';
import { useForwardedRef } from '@leafygreen-ui/select/src/utils';
import { spacing } from '@leafygreen-ui/tokens';

import { CalendarCell, CalendarCellState } from '../../Calendar/CalendarCell';
import { CalendarGrid } from '../../Calendar/CalendarGrid';
import { MenuWrapper } from '../../Calendar/MenuWrapper';
import { Months } from '../../constants';
import { useDatePickerContext } from '../../DatePickerContext';
import { getDaysInUTCMonth } from '../../utils/getDaysInUTCMonth';
import { getUTCDateString } from '../../utils/getUTCDateString';
import { isSameUTCDay } from '../../utils/isSameUTCDay';
import { isSameUTCMonth } from '../../utils/isSameUTCMonth';
import { setToUTCMidnight } from '../../utils/setToUTCMidnight';
import { setUTCDate } from '../../utils/setUTCDate';
import { setUTCMonth } from '../../utils/setUTCMonth';

import {
  menuCalendarGridStyles,
  menuContentStyles,
  menuWrapperStyles,
} from './DatePickerMenu.styles';
import { DatePickerMenuProps } from './DatePickerMenu.types';
import { DatePickerMenuHeader } from './DatePickerMenuHeader';

export const DatePickerMenu = forwardRef<HTMLDivElement, DatePickerMenuProps>(
  (
    {
      isOpen,
      value,
      month,
      setMonth,
      onCellClick,
      ...rest
    }: DatePickerMenuProps,
    fwdRef,
  ) => {
    const today = useMemo(() => setToUTCMidnight(new Date(Date.now())), []);
    const monthLabel =
      Months[month.getUTCMonth()].long + ' ' + month.getUTCFullYear();
    const ref = useForwardedRef(fwdRef, null);
    const headerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLTableElement>(null);
    // TODO:
    // useDynamicRefs may overflow if a user navigates to too many months.
    // consider purging the refs map within the hook
    const cellRefs = useDynamicRefs<HTMLTableCellElement>();
    const { isInRange } = useDatePickerContext();
    const [highlight, setHighlight] = useState<Date | null>(value || today);

    // A wrapper for setMonth that handles side effects
    const updateMonth: typeof setMonth = newMonth => {
      if (
        isSameUTCMonth(newMonth, month) ||
        isSameUTCMonth(newMonth, highlight)
      ) {
        return;
      }

      if (isAfter(newMonth, month)) {
        // set highlight to first of month
        const newHighlight = highlight
          ? setUTCMonth(setUTCDate(highlight, 1), newMonth.getUTCMonth())
          : setUTCDate(newMonth, 1);
        setHighlight(newHighlight);
      } else {
        // set highlight to last of month
        const daysInMonth = getDaysInUTCMonth(newMonth);
        const newHighlight = highlight
          ? setUTCMonth(
              setUTCDate(highlight, daysInMonth),
              newMonth.getUTCMonth(),
            )
          : setUTCDate(newMonth, daysInMonth);
        setHighlight(newHighlight);
      }

      setMonth(newMonth);
    };

    const getCellState = (cellDay: Date | null) => {
      if (isInRange(cellDay)) {
        if (isSameUTCDay(cellDay, value)) {
          return CalendarCellState.Active;
        }

        return CalendarCellState.Default;
      }

      return CalendarCellState.Disabled;
    };

    const cellClickHandlerForDay = (day: Date) => () => {
      if (isInRange(day)) {
        onCellClick(day);
      }
    };

    // Implementing custom focus-trap logic,
    // since focus-trap-react focuses the first element immediately on mount
    const handleWrapperTabKeyPress: KeyboardEventHandler<
      HTMLDivElement
    > = e => {
      if (e.key === keyMap.Tab) {
        const currentFocus = document.activeElement;
        const highlightKey = highlight?.toISOString();
        const highlightedCellElement = highlightKey
          ? cellRefs(highlightKey)?.current
          : undefined;
        const rightChevronElement = headerRef.current?.lastElementChild;

        if (!e.shiftKey && currentFocus === rightChevronElement) {
          (highlightedCellElement as HTMLElement)?.focus();
          e.preventDefault();
        } else if (e.shiftKey && currentFocus === highlightedCellElement) {
          (rightChevronElement as HTMLElement)?.focus();
          e.preventDefault();
        }
      }
    };

    const handleCalendarKeyDown: KeyboardEventHandler<HTMLTableElement> = ({
      key,
    }) => {
      const highlightStart = highlight || value || today;
      let nextHighlight = highlightStart;

      switch (key) {
        case keyMap.ArrowLeft: {
          nextHighlight = subDays(highlightStart, 1);
          break;
        }

        case keyMap.ArrowRight: {
          nextHighlight = addDays(highlightStart, 1);
          break;
        }

        case keyMap.ArrowUp: {
          nextHighlight = subDays(highlightStart, 7);
          break;
        }

        case keyMap.ArrowDown: {
          nextHighlight = addDays(highlightStart, 7);
          break;
        }

        default:
          break;
      }

      // if nextHighlight is in range
      if (isInRange(nextHighlight)) {
        // change month if nextHighlight is different than `month`
        if (month.getUTCMonth() !== nextHighlight.getUTCMonth()) {
          updateMonth(nextHighlight);
        }

        setHighlight(nextHighlight);

        const nextCellRef = cellRefs(nextHighlight.toISOString());
        nextCellRef.current?.focus();
      }
    };

    return (
      <MenuWrapper
        ref={ref}
        role="listbox"
        active={isOpen}
        spacing={spacing[1]}
        className={menuWrapperStyles}
        onKeyDown={handleWrapperTabKeyPress}
        usePortal
        {...rest}
      >
        <div className={menuContentStyles}>
          {/**
           * Calendar & Header are reversed in the DOM,
           * and visually updated with CSS grid
           * in order to achieve the correct tab-order
           * (i.e. calendar is focused first)
           */}
          <CalendarGrid
            ref={calendarRef}
            month={month}
            className={menuCalendarGridStyles}
            onKeyDown={handleCalendarKeyDown}
            aria-label={monthLabel}
            // tabIndex={0}
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
          <DatePickerMenuHeader
            ref={headerRef}
            month={month}
            setMonth={updateMonth}
          />
        </div>
      </MenuWrapper>
    );
  },
);

DatePickerMenu.displayName = 'DatePickerMenu';
