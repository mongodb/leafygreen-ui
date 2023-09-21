import React, {
  forwardRef,
  KeyboardEventHandler,
  useRef,
  useState,
} from 'react';

import { keyMap } from '@leafygreen-ui/lib';
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
    const headerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLTableElement>(null);
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

    const makeCellClickHandler = (day: Date) => () => {
      if (isInRange(day)) {
        onCellClick(day);
      }
    };

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = ({
      shiftKey,
      target,
      key,
    }) => {
      switch (key) {
        case keyMap.Tab:
          {
            // Implementing custom focus-trap logic,
            // since focus-trap-react focuses the first element immediately on mount
            const activeElement = document.activeElement;
            const firstElement = headerRef.current?.firstElementChild;
            const lastElement = calendarRef.current;

            if (!shiftKey && activeElement === lastElement) {
              (firstElement as HTMLElement)?.focus();
            } else if (shiftKey && activeElement === firstElement) {
              lastElement?.focus();
            }
          }
          break;

        case keyMap.ArrowDown: {
          break;
        }

        default:
          break;
      }
    };

    return (
      <MenuWrapper
        ref={ref}
        role="listbox"
        active={isOpen}
        spacing={spacing[1]}
        className={menuWrapperStyles}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <div className={menuContentStyles}>
          <DatePickerMenuHeader
            ref={headerRef}
            month={month}
            onMonthChange={onMonthChange}
          />
          <CalendarGrid
            ref={calendarRef}
            month={month}
            className={menuCalendarGridStyles}
            onMouseLeave={() => setHighlight(null)}
            aria-label={monthLabel}
            tabIndex={0}
          >
            {(day, i) => (
              <CalendarCell
                key={i}
                aria-label={day.toDateString()}
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
