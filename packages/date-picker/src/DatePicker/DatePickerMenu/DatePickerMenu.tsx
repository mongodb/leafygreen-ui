import React, { useState } from 'react';
import { isSameDay, isToday } from 'date-fns';

import { CalendarCell, CalendarCellState } from '../../Calendar/CalendarCell';
import { CalendarGrid } from '../../Calendar/CalendarGrid';
import { MenuWrapper } from '../../Calendar/MenuWrapper';
import { useDatePickerContext } from '../../DatePickerContext';

import {
  menuCalendarGridStyles,
  menuWrapperStyles,
} from './DatePickerMenu.styles';
import { DatePickerMenuProps } from './DatePickerMenu.types';
import { DatePickerMenuHeader } from './DatePickerMenuHeader';

const nullIsSameDay = (d1?: Date | null, d2?: Date | null) =>
  !!(d1 && d2 && isSameDay(d1, d2));

export function DatePickerMenu({
  isOpen,
  value,
  month,
  onMonthChange,
  onCellClick,
  ...rest
}: DatePickerMenuProps) {
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

  return (
    <MenuWrapper active={isOpen} className={menuWrapperStyles} {...rest}>
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
          >
            {day?.getDate()}
          </CalendarCell>
        )}
      </CalendarGrid>
    </MenuWrapper>
  );
}

DatePickerMenu.displayName = 'DatePickerMenu';
