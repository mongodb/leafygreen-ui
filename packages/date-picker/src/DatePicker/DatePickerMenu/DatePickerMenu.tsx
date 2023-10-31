import React, {
  forwardRef,
  KeyboardEventHandler,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { addDays, subDays } from 'date-fns';

import {
  useDynamicRefs,
  useForwardedRef,
  usePrevious,
} from '@leafygreen-ui/hooks';
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
  getUTCDateString,
  isSameUTCDay,
  isSameUTCMonth,
  setToUTCMidnight,
} from '../../shared/utils';

import { getNewHighlight } from './utils/getNewHighlight';
import {
  menuCalendarGridStyles,
  menuContentStyles,
  menuWrapperStyles,
} from './DatePickerMenu.styles';
import { DatePickerMenuProps } from './DatePickerMenu.types';
import { DatePickerMenuHeader } from './DatePickerMenuHeader';

export const DatePickerMenu = forwardRef<HTMLDivElement, DatePickerMenuProps>(
  (
    { value, onCellClick, handleValidation, ...rest }: DatePickerMenuProps,
    fwdRef,
  ) => {
    const today = useMemo(() => setToUTCMidnight(new Date(Date.now())), []);
    const { isInRange, isOpen, setOpen } = useDatePickerContext();

    // TODO: https://jira.mongodb.org/browse/LG-3666
    // useDynamicRefs may overflow if a user navigates to too many months.
    // consider purging the refs map within the hook
    const cellRefs = useDynamicRefs<HTMLTableCellElement>();
    const ref = useForwardedRef(fwdRef, null);
    const headerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLTableElement>(null);

    const [month, setDisplayMonth] = useState<Date>(
      value ?? getFirstOfMonth(today),
    );
    const [highlight, setHighlight] = useState<Date | null>(value || today);

    const prevValue = usePrevious(value);
    const prevHighlight = usePrevious(highlight);

    const monthLabel = getFullMonthLabel(month);

    /** setDisplayMonth with side effects */
    const updateMonth = (newMonth: Date) => {
      if (isSameUTCMonth(newMonth, month)) {
        return;
      }

      const newHighlight = getNewHighlight(highlight, month, newMonth);
      const shouldUpdateHighlight = !isSameUTCDay(highlight, newHighlight);

      if (newHighlight && shouldUpdateHighlight) {
        setHighlight(newHighlight);
      }

      setDisplayMonth(newMonth);
    };

    /** setHighlight with side effects */
    const updateHighlight = (newHighlight: Date) => {
      // change month if nextHighlight is different than `month`
      if (!isSameUTCMonth(month, newHighlight)) {
        setDisplayMonth(newHighlight);
      }

      // keep track of the highlighted cell
      setHighlight(newHighlight);
    };

    /**
     * When highlight changes, after the DOM changes, focus the relevant cell
     */
    useLayoutEffect(() => {
      if (highlight && !isSameUTCDay(highlight, prevHighlight)) {
        const highlightCellRef = cellRefs(highlight.toISOString());
        highlightCellRef.current?.focus();
      }
    }, [cellRefs, highlight, prevHighlight]);

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
    }, [month, prevValue, value]);

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

    /** Creates a click handler for a specific cell date */
    const cellClickHandlerForDay = (day: Date) => () => {
      if (isInRange(day)) {
        onCellClick(day);
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

        case keyMap.Escape:
          setOpen(false);
          handleValidation?.(value);
          break;

        // The isInRange check below prevents tab presses from propagating up so we add a switch case for tab presses where we can then call handleWrapperTabKeyPress which will handle trapping focus
        case keyMap.Tab:
          handleWrapperTabKeyPress(e);
          break;

        default:
          break;
      }

      // if nextHighlight is in range
      if (isInRange(nextHighlight)) {
        updateHighlight(nextHighlight);
        // Prevent the parent keydown handler from being called
        e.stopPropagation();
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
            handleValidation={handleValidation}
            value={value}
          />
        </div>
      </MenuWrapper>
    );
  },
);

DatePickerMenu.displayName = 'DatePickerMenu';
