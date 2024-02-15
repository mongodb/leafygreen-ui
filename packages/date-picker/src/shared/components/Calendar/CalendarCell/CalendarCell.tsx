import React, {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';

import {
  calendarCellCurrentStyles,
  calendarCellHighlightStyles,
  calendarCellHoverStyles,
  calendarCellRangeHoverStyles,
  calendarCellRangeStyles,
  calendarCellStateStyles,
  calendarCellStyles,
  cellTextCurrentStyles,
  cellTextStyles,
  indicatorBaseStyles,
  indicatorClassName,
} from './CalendarCell.styles';
import {
  CalendarCellProps,
  CalendarCellRangeState,
  CalendarCellState,
} from './CalendarCell.types';

/**
 * A single calendar cell.
 *
 * Renders the appropriate styles based on
 * the provided state, current & highlight props
 */
export const CalendarCell = React.forwardRef<
  HTMLTableCellElement,
  CalendarCellProps
>(
  (
    {
      children,
      state = CalendarCellState.Default,
      rangeState = CalendarCellRangeState.None,
      isCurrent,
      isHighlighted,
      className,
      onClick,
      ...rest
    }: CalendarCellProps,
    fwdRef,
  ) => {
    const ref = useForwardedRef(fwdRef, null);
    const { theme } = useDarkMode();

    const isDisabled = state === CalendarCellState.Disabled;
    const isFocusable = isHighlighted && !isDisabled;
    const isActive = state === CalendarCellState.Active;
    const isInRange = rangeState !== CalendarCellRangeState.None;

    const handleClick: MouseEventHandler<HTMLTableCellElement> = e => {
      if (!isDisabled) {
        (onClick as MouseEventHandler<HTMLTableCellElement>)?.(e);
      }
    };

    // td does not trigger `onClick` on enter/space so we have to listen on key down
    const handleKeyDown: KeyboardEventHandler<HTMLTableCellElement> = e => {
      if (!isDisabled && (e.key === keyMap.Enter || e.key === keyMap.Space)) {
        (onClick as KeyboardEventHandler<HTMLTableCellElement>)?.(e);
      }
    };

    const handleFocus: FocusEventHandler<HTMLTableCellElement> = e => {
      // not checking `isHighlighted` since this event is triggered
      // before the prop changes
      if (state === CalendarCellState.Disabled) {
        e.currentTarget.blur();
      }
    };

    return (
      <td
        ref={ref}
        role="gridcell"
        data-testid="lg-date_picker-calendar_cell"
        data-highlighted={isHighlighted}
        aria-current={isCurrent}
        aria-selected={isActive}
        aria-disabled={state === CalendarCellState.Disabled}
        tabIndex={isFocusable ? 0 : -1}
        className={cx(
          calendarCellStyles,
          calendarCellStateStyles[theme][state],
          calendarCellHoverStyles[theme][state],
          {
            [calendarCellRangeStyles[theme][rangeState]]: !isDisabled,
            [calendarCellCurrentStyles[theme][state]]: isCurrent,
            [calendarCellRangeHoverStyles[theme]]: isInRange && !isActive,
            [calendarCellHighlightStyles[theme]]: isFocusable,
          },
          className,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        {...rest}
      >
        <div className={cx(indicatorBaseStyles, indicatorClassName)}></div>
        <span
          className={cx(cellTextStyles, {
            [cellTextCurrentStyles]: isCurrent,
          })}
        >
          {children}
        </span>
      </td>
    );
  },
);

CalendarCell.displayName = 'CalendarCell';
