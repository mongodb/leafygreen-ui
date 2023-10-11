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
  calendarCellStateStyles,
  calendarCellStyles,
  cellTextCurrentStyles,
  cellTextStyles,
  indicatorBaseStyles,
  indicatorClassName,
} from './CalendarCell.styles';
import { CalendarCellProps, CalendarCellState } from './CalendarCell.types';

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

    const isFocusable = isHighlighted && state !== CalendarCellState.Disabled;

    const isActive = (
      [
        CalendarCellState.Active,
        CalendarCellState.Start,
        CalendarCellState.End,
      ] as Array<CalendarCellState>
    ).includes(state);

    const handleClick: MouseEventHandler<HTMLTableCellElement> = e => {
      if (state !== CalendarCellState.Disabled) {
        (onClick as MouseEventHandler<HTMLTableCellElement>)?.(e);
      }
    };

    // td does not trigger `onClick` on enter/space so we have to listen on key up
    const handleKeyUp: KeyboardEventHandler<HTMLTableCellElement> = e => {
      if (
        state !== CalendarCellState.Disabled &&
        (e.code === keyMap.Enter || e.code === keyMap.Space)
      ) {
        (onClick as KeyboardEventHandler<HTMLTableCellElement>)?.(e);
        // TODO: add focus back to input
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
            [calendarCellCurrentStyles[theme][state]]: isCurrent,
            [calendarCellHighlightStyles[theme]]: isFocusable,
          },
          className,
        )}
        onClick={handleClick}
        onKeyUp={handleKeyUp}
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
