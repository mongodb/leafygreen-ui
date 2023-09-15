import React, { MouseEventHandler } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  calendarCellCurrentStyles,
  calendarCellHighlightStyles,
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

    return (
      <td
        ref={ref}
        role="gridcell"
        aria-selected={isActive}
        aria-disabled={state === CalendarCellState.Disabled}
        className={cx(
          calendarCellStyles,

          calendarCellStateStyles[theme][state],
          {
            [calendarCellCurrentStyles[theme][state]]: isCurrent,
            [calendarCellHighlightStyles[theme][state]]: isHighlighted,
          },
          className,
        )}
        onClick={handleClick}
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
