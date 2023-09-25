import React, { FocusEventHandler, MouseEventHandler } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

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
        onClick?.(e);
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
        data-highlight={isHighlighted}
        aria-current={isCurrent}
        aria-selected={isActive}
        aria-disabled={state === CalendarCellState.Disabled}
        tabIndex={isFocusable ? 0 : -1}
        className={cx(
          calendarCellStyles,
          calendarCellStateStyles[theme][state],
          calendarCellHoverStyles(theme, state),
          {
            [calendarCellCurrentStyles[theme][state]]: isCurrent,
            [calendarCellHighlightStyles[theme][state]]: isHighlighted,
          },
          className,
        )}
        onClick={handleClick}
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
