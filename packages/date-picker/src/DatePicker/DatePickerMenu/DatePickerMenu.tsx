import React, {
  forwardRef,
  KeyboardEventHandler,
  TransitionEventHandler,
  useEffect,
  useRef,
} from 'react';
import { ExitHandler } from 'react-transition-group/Transition';

import {
  addDaysUTC,
  getFirstOfUTCMonth,
  getFullMonthLabel,
  getISODate,
  getUTCDateString,
  isSameTZDay,
  isSameUTCDay,
  isSameUTCMonth,
  isValidDate,
} from '@leafygreen-ui/date-utils';
import { useForwardedRef, usePrevious } from '@leafygreen-ui/hooks';
import { keyMap } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

import {
  CalendarCell,
  CalendarCellState,
  CalendarGrid,
} from '../../shared/components/Calendar';
import { MenuWrapper } from '../../shared/components/MenuWrapper';
import { useSharedDatePickerContext } from '../../shared/context';
import { useDatePickerContext } from '../DatePickerContext';

import { shouldChevronBeDisabled } from './DatePickerMenuHeader/utils';
import { getNewHighlight } from './utils/getNewHighlight';
import {
  menuCalendarGridStyles,
  menuContentStyles,
  menuWrapperStyles,
} from './DatePickerMenu.styles';
import { DatePickerMenuProps } from './DatePickerMenu.types';
import { DatePickerMenuHeader } from './DatePickerMenuHeader';

export const DatePickerMenu = forwardRef<HTMLDivElement, DatePickerMenuProps>(
  ({ onKeyDown, onExited, ...rest }: DatePickerMenuProps, fwdRef) => {
    const { min, max, isInRange, isOpen, setIsDirty, timeZone } =
      useSharedDatePickerContext();
    const {
      refs,
      today,
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
      menuTriggerEvent,
    } = useDatePickerContext();

    const ref = useForwardedRef(fwdRef, null);
    const cellRefs = refs.calendarCellRefs;
    const headerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLTableElement>(null);

    const prevValue = usePrevious(value);

    const monthLabel = getFullMonthLabel(month);

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

    /**
     * SETTERS
     */

    /** setDisplayMonth with side effects */
    const updateMonth = (newMonth: Date) => {
      if (isSameUTCMonth(newMonth, month)) {
        return;
      }

      setDisplayMonth(newMonth);

      const newHighlight = getNewHighlight(highlight, month, newMonth, value);
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
     * SIDE EFFECTS
     */

    /** Set the highlighted cell when the value changes in the input */
    useEffect(() => {
      if (
        isValidDate(value) &&
        !isSameUTCDay(value, prevValue) &&
        isInRange(value)
      ) {
        setHighlight(value);
      }
    }, [value, isInRange, setHighlight, prevValue]);

    /**
     * If the new value is not the current month, update the month
     */
    useEffect(() => {
      if (
        isValidDate(value) &&
        !isSameUTCDay(value, prevValue) &&
        !isSameUTCMonth(value, month)
      ) {
        setDisplayMonth(getFirstOfUTCMonth(value));
      }
    }, [month, prevValue, setDisplayMonth, value]);

    /**
     * EVENT HANDLERS
     */

    /**
     * Fired when the CSS transition to open the menu is finished.
     * Sets the initial focus on the highlighted cell
     */
    const handleMenuTransitionEntered: TransitionEventHandler = e => {
      // Whether this event is firing in response to the menu transition
      const isTransitionedElementMenu = e.target === ref.current;

      // Whether the latest openMenu event was triggered by the calendar button
      const isTriggeredByButton =
        menuTriggerEvent &&
        refs.calendarButtonRef.current?.contains(
          menuTriggerEvent.target as HTMLElement,
        );

      // Only move focus to input when opened via button click
      if (isOpen && isTransitionedElementMenu && isTriggeredByButton) {
        // When the menu opens, set focus to the `highlight` cell
        const highlightedCell = getHighlightedCell();

        if (highlightedCell) {
          highlightedCell.focus();
        } else if (!shouldChevronBeDisabled('left', month, min)) {
          refs.chevronButtonRefs.left.current?.focus();
        } else if (!shouldChevronBeDisabled('right', month, max)) {
          refs.chevronButtonRefs.right.current?.focus();
        }
      }
    };

    /**
     * Fired when the Transform element for the menu has exited.
     * Fires side effects when the menu closes
     */
    const handleMenuTransitionExited: ExitHandler<HTMLDivElement> = () => {
      if (!isOpen) {
        onExited?.();
        closeMenu();
      }
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

    /**
     * Fired on any key press.
     * Handles custom focus trap logic
     */
    const handleMenuKeyPress: KeyboardEventHandler<HTMLDivElement> = e => {
      const { key } = e;

      // Implementing custom focus-trap logic,
      // since focus-trap-react focuses the first element immediately on mount
      if (key === keyMap.Tab) {
        const currentFocus = document.activeElement;

        const highlightedCellElement = getHighlightedCell();
        const rightChevronElement = headerRef.current?.lastElementChild;

        const isFocusOnRightChevron = currentFocus === rightChevronElement;
        const isFocusOnCell = currentFocus === highlightedCellElement;

        if (!e.shiftKey) {
          // If the Date Picker is nested inside a component that uses focus-trap-react, e.g. Modal, this prevents the focus-trap-react package from hijacking the focus when tabbing
          if (!ref.current?.contains(currentFocus) || isFocusOnRightChevron) {
            (highlightedCellElement as HTMLElement)?.focus();
            e.preventDefault();
          }
        } else if (e.shiftKey && isFocusOnCell) {
          (rightChevronElement as HTMLElement)?.focus();
          e.preventDefault();
        }
      }

      // call any handler that was passed in
      onKeyDown?.(e);
    };

    /**
     * Called on any keydown within the CalendarGrid element.
     * Responsible for updating the highlight +/- 1 day or 1 week
     */
    const handleCalendarKeyDown: KeyboardEventHandler<HTMLTableElement> = e => {
      const { key } = e;

      const currentHighlight =
        highlight || (isValidDate(value) ? value : today);
      let nextHighlight = currentHighlight;

      switch (key) {
        case keyMap.ArrowLeft: {
          e.preventDefault();
          nextHighlight = addDaysUTC(currentHighlight, -1);
          break;
        }

        case keyMap.ArrowRight: {
          e.preventDefault();
          nextHighlight = addDaysUTC(currentHighlight, 1);
          break;
        }

        case keyMap.ArrowUp: {
          e.preventDefault();
          nextHighlight = addDaysUTC(currentHighlight, -7);
          break;
        }

        case keyMap.ArrowDown: {
          e.preventDefault();
          nextHighlight = addDaysUTC(currentHighlight, 7);
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
    };

    return (
      <MenuWrapper
        ref={ref}
        role="listbox"
        active={isOpen}
        spacing={spacing[1]}
        data-today={today.toISOString()}
        className={menuWrapperStyles}
        usePortal
        onKeyDown={handleMenuKeyPress}
        onTransitionEnd={handleMenuTransitionEntered}
        onExited={handleMenuTransitionExited}
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
            // TODO: Test month label in different time zones
            aria-label={monthLabel}
          >
            {(day, i) => {
              return (
                // TODO: Test highlight rendering in different time zones
                <CalendarCell
                  key={i}
                  ref={cellRefs(getISODate(day))}
                  data-iso={getISODate(day)}
                  aria-label={getUTCDateString(day)}
                  isHighlighted={isSameUTCDay(highlight, day)}
                  isCurrent={isSameTZDay(today, day, timeZone)}
                  state={getCellState(day)}
                  onClick={cellClickHandlerForDay(day)}
                >
                  {day.getUTCDate()}
                </CalendarCell>
              );
            }}
          </CalendarGrid>
          <DatePickerMenuHeader ref={headerRef} setMonth={updateMonth} />
        </div>
      </MenuWrapper>
    );
  },
);

DatePickerMenu.displayName = 'DatePickerMenu';
