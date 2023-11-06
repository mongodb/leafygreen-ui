import React, {
  forwardRef,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { addDays, subDays } from 'date-fns';

import { useForwardedRef, usePrevious } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

import {
  CalendarCell,
  CalendarCellState,
  CalendarGrid,
} from '../../shared/components/Calendar';
import { useDatePickerContext } from '../../shared/components/DatePickerContext';
import { MenuWrapper } from '../../shared/components/MenuWrapper';
import {
  getFirstOfMonth,
  getFullMonthLabel,
  getISODate,
  getUTCDateString,
  isSameUTCDay,
  isSameUTCMonth,
  setToUTCMidnight,
} from '../../shared/utils';
import { useSingleDateContext } from '../SingleDateContext';

import { getNewHighlight } from './utils/getNewHighlight';
import {
  menuCalendarGridStyles,
  menuContentStyles,
  menuWrapperStyles,
} from './DatePickerMenu.styles';
import { DatePickerMenuProps } from './DatePickerMenu.types';
import { DatePickerMenuHeader } from './DatePickerMenuHeader';

export const DatePickerMenu = forwardRef<HTMLDivElement, DatePickerMenuProps>(
  ({ onKeyDown, ...rest }: DatePickerMenuProps, fwdRef) => {
    const today = useMemo(() => setToUTCMidnight(new Date(Date.now())), []);
    const { isInRange, isOpen, setIsDirty } = useDatePickerContext();
    const {
      refs,
      value,
      setValue,
      handleValidation,
      month,
      setMonth: setDisplayMonth,
      highlight,
      closeMenu,
      setHighlight,
      getCellWithValue,
      getHighlightedCell,
    } = useSingleDateContext();

    const ref = useForwardedRef(fwdRef, null);
    const cellRefs = refs.calendarCellRefs;
    const headerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLTableElement>(null);

    const prevValue = usePrevious(value);
    // const prevOpen = usePrevious(isOpen);
    // const prevHighlight = usePrevious(highlight);

    const monthLabel = getFullMonthLabel(month);

    /** setDisplayMonth with side effects */
    const updateMonth = (newMonth: Date) => {
      if (isSameUTCMonth(newMonth, month)) {
        return;
      }
      setDisplayMonth(newMonth);
      const newHighlight = getNewHighlight(highlight, month, newMonth);
      const shouldUpdateHighlight = !isSameUTCDay(highlight, newHighlight);

      if (newHighlight && shouldUpdateHighlight) {
        setHighlight(newHighlight);
      }
    };

    /** setHighlight with side effects */
    const updateHighlight = (newHighlight: Date) => {
      // change month if nextHighlight is different than `month`
      if (!isSameUTCMonth(month, newHighlight)) {
        setDisplayMonth(newHighlight);
      }
      setHighlight(newHighlight);
      requestAnimationFrame(() => {
        const highlightedCell = getCellWithValue(newHighlight);
        highlightedCell?.focus();
      });
    };

    /**
     * If the new value is not the current month, update the month
     */
    useEffect(() => {
      if (
        value &&
        !isSameUTCDay(value, prevValue) &&
        !isSameUTCMonth(value, month)
      ) {
        setDisplayMonth(getFirstOfMonth(value));
      }
    }, [month, prevValue, setDisplayMonth, value]);

    /** Returns the current state of the cell */
    const getCellState = (cellDay: Date | null): CalendarCellState => {
      if (isInRange(cellDay)) {
        if (isSameUTCDay(cellDay, value)) {
          return CalendarCellState.Active;
        }

        return CalendarCellState.Default;
      }

      return CalendarCellState.Disabled;
    };

    /** Called when any calendar cell is clicked */
    const handleCalendarCellClick = (cellValue: Date) => {
      if (!isSameUTCDay(cellValue, value)) {
        // when the value is changed via cell,
        // we trigger validation every time
        handleValidation?.(cellValue);
        setIsDirty(true);
        // finally we update the component value
        setValue(cellValue);
      }
      // and close the menu
      closeMenu();
    };

    /** Creates a click handler for a specific cell date */
    const cellClickHandlerForDay = (day: Date) => () => {
      if (isInRange(day)) {
        handleCalendarCellClick(day);
      }
    };

    // Focus trap
    const handleWrapperTabKeyPress: KeyboardEventHandler<
      HTMLDivElement
    > = e => {
      // Implementing custom focus-trap logic,
      // since focus-trap-react focuses the first element immediately on mount
      if (e.key === keyMap.Tab) {
        const currentFocus = document.activeElement;

        const highlightedCellElement = getHighlightedCell();
        const rightChevronElement = headerRef.current?.lastElementChild;

        const isFocusOnRightChevron = currentFocus === rightChevronElement;
        const isFocusOnCell = currentFocus === highlightedCellElement;

        if (!e.shiftKey && isFocusOnRightChevron) {
          (highlightedCellElement as HTMLElement)?.focus();
          e.preventDefault();
        } else if (e.shiftKey && isFocusOnCell) {
          (rightChevronElement as HTMLElement)?.focus();
          e.preventDefault();
        }
      }
    };

    /** Called on any keydown within the CalendarGrid element */
    const handleCalendarKeyDown: KeyboardEventHandler<HTMLTableElement> = e => {
      const { key } = e;
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
      if (isInRange(nextHighlight) && !isSameUTCDay(nextHighlight, highlight)) {
        updateHighlight(nextHighlight);
        // Prevent the parent keydown handler from being called
        e.stopPropagation();
      }

      // call any handler that was passed in
      onKeyDown?.(e);
    };

    return (
      <MenuWrapper
        ref={ref}
        role="listbox"
        active={isOpen}
        spacing={spacing[1]}
        className={menuWrapperStyles}
        usePortal
        onKeyDown={handleWrapperTabKeyPress}
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
          >
            {(day, i) => (
              <CalendarCell
                key={i}
                ref={cellRefs(getISODate(day))}
                aria-label={getUTCDateString(day)}
                isHighlighted={isSameUTCDay(day, highlight)}
                isCurrent={isSameUTCDay(day, today)}
                state={getCellState(day)}
                onClick={cellClickHandlerForDay(day)}
                data-iso={getISODate(day)}
              >
                {day.getUTCDate()}
              </CalendarCell>
            )}
          </CalendarGrid>
          <DatePickerMenuHeader
            ref={headerRef}
            month={month}
            setMonth={updateMonth}
            handleValidation={handleValidation}
            value={value}
          />
        </div>
      </MenuWrapper>
    );
  },
);

DatePickerMenu.displayName = 'DatePickerMenu';
