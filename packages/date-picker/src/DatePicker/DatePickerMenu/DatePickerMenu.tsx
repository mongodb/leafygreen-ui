import React, { forwardRef, useState } from 'react';
import { isSameDay, isToday } from 'date-fns';

import { useForwardedRef } from '@leafygreen-ui/select/src/utils';
import { spacing } from '@leafygreen-ui/tokens';

import { CalendarCell, CalendarCellState } from '../../Calendar/CalendarCell';
import { CalendarGrid } from '../../Calendar/CalendarGrid';
import { MenuWrapper } from '../../Calendar/MenuWrapper';
import { useDatePickerContext } from '../../DatePickerContext';

import {
  menuCalendarGridStyles,
  menuContentStyles,
  menuWrapperStyles,
} from './DatePickerMenu.styles';
import { DatePickerMenuProps } from './DatePickerMenu.types';
import { DatePickerMenuHeader } from './DatePickerMenuHeader';

const nullIsSameDay = (d1?: Date | null, d2?: Date | null) =>
  !!(d1 && d2 && isSameDay(d1, d2));

export const DatePickerMenu = forwardRef<HTMLDivElement, DatePickerMenuProps>(
  (
    {
      isOpen,
      value,
      month,
      onMonthChange,
      onCellClick,
      ...rest
    }: DatePickerMenuProps,
    fwdRef,
  ) => {
    const { isInRange } = useDatePickerContext();
    const [highlight, setHighlight] = useState<Date | null>(null);

    const getCellState = (cellDay: Date | null) => {
      if (isInRange(cellDay)) {
        if (nullIsSameDay(cellDay, value)) {
          return CalendarCellState.Active;
        }

        return CalendarCellState.Default;
      }

      return CalendarCellState.Disabled;
    };

    const ref = useForwardedRef(fwdRef, null);

    return (
      <MenuWrapper
        active={isOpen}
        spacing={spacing[1]}
        className={menuWrapperStyles}
        {...rest}
      >
        <div ref={ref} className={menuContentStyles}>
          <DatePickerMenuHeader month={month} onMonthChange={onMonthChange} />
          <CalendarGrid
            month={month}
            className={menuCalendarGridStyles}
            onMouseLeave={() => setHighlight(null)}
          >
            {day => (
              <CalendarCell
                isHighlighted={nullIsSameDay(day, highlight)}
                isCurrent={isToday(day)}
                state={getCellState(day)}
                onMouseEnter={() => setHighlight(day)}
                onClick={() => onCellClick(day)}
                date-iso={day.toISOString()}
              >
                {day.getDate()}
              </CalendarCell>
            )}
          </CalendarGrid>
        </div>
      </MenuWrapper>
    );
  },
);

DatePickerMenu.displayName = 'DatePickerMenu';
