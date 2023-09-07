import React, { forwardRef, useState } from 'react';

import { useForwardedRef } from '@leafygreen-ui/select/src/utils';
import { spacing } from '@leafygreen-ui/tokens';

import { CalendarCell, CalendarCellState } from '../../Calendar/CalendarCell';
import { CalendarGrid } from '../../Calendar/CalendarGrid';
import { MenuWrapper } from '../../Calendar/MenuWrapper';
import { useDatePickerContext } from '../../DatePickerContext';
import { isCurrentUTCDay } from '../../utils/isCurrentUTCDay';
import { isSameUTCDay } from '../../utils/isSameUTCDay';

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
        if (isSameUTCDay(cellDay, value)) {
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
                isHighlighted={isSameUTCDay(day, highlight)}
                isCurrent={isCurrentUTCDay(day)}
                state={getCellState(day)}
                onMouseEnter={() => setHighlight(day)}
                onClick={() => onCellClick(day)}
                data-iso={day.toISOString()}
              >
                {day.getUTCDate()}
              </CalendarCell>
            )}
          </CalendarGrid>
        </div>
      </MenuWrapper>
    );
  },
);

DatePickerMenu.displayName = 'DatePickerMenu';
