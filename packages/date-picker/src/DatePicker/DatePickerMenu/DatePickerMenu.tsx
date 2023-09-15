import React, { forwardRef, useState } from 'react';

import { useForwardedRef } from '@leafygreen-ui/select/src/utils';
import { spacing } from '@leafygreen-ui/tokens';

import { CalendarCell, CalendarCellState } from '../../Calendar/CalendarCell';
import { CalendarGrid } from '../../Calendar/CalendarGrid';
import { MenuWrapper } from '../../Calendar/MenuWrapper';
import { Months } from '../../constants';
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
    const monthLabel =
      Months[month.getUTCMonth()].long + ' ' + month.getUTCFullYear();

    const makeCellHoverHandler = (day: Date) => () => setHighlight(day);

    const makeCellClickHandler = (day: Date) => () => onCellClick(day);
    return (
      <MenuWrapper
        active={isOpen}
        spacing={spacing[1]}
        className={menuWrapperStyles}
        ref={ref}
        role="listbox"
        {...rest}
      >
        <div className={menuContentStyles}>
          <DatePickerMenuHeader month={month} onMonthChange={onMonthChange} />
          <CalendarGrid
            month={month}
            className={menuCalendarGridStyles}
            onMouseLeave={() => setHighlight(null)}
            aria-label={monthLabel}
          >
            {(day, i) => (
              <CalendarCell
                key={i}
                isHighlighted={isSameUTCDay(day, highlight)}
                isCurrent={isCurrentUTCDay(day)}
                state={getCellState(day)}
                onMouseEnter={makeCellHoverHandler(day)}
                onClick={makeCellClickHandler(day)}
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
