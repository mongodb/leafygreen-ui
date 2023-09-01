import React, { useState } from 'react';
import {
  getMonth,
  getYear,
  isSameDay,
  isToday,
  isWithinInterval,
  setMonth,
  setYear,
} from 'date-fns';
import { range } from 'lodash';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { DropdownWidthBasis, Option, Select } from '@leafygreen-ui/select';

import { CalendarCell, CalendarCellState } from '../../Calendar/CalendarCell';
import { CalendarGrid } from '../../Calendar/CalendarGrid';
import { MenuWrapper } from '../../Calendar/MenuWrapper';
import { Months } from '../../constants';
import { useDatePickerContext } from '../../DatePickerContext';

import {
  menuCalendarGridStyles,
  menuHeaderSelectContainerStyles,
  menuHeaderStyles,
  menuWrapperStyles,
} from './DatePickerMenu.styles';
import { DatePickerMenuProps } from './DatePickerMenu.types';

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
  const { min, max } = useDatePickerContext();
  const [highlight, setHighlight] = useState<Date | null>(null);

  const yearOptions = range(getYear(min), getYear(max));

  const getCellState = (cellDay: Date | null) => {
    if (
      cellDay &&
      isWithinInterval(cellDay, {
        start: new Date(min) || cellDay,
        end: new Date(max) || cellDay,
      })
    ) {
      if (nullIsSameDay(cellDay, value)) {
        return CalendarCellState.Active;
      }

      return CalendarCellState.Default;
    }

    return CalendarCellState.Disabled;
  };

  return (
    <MenuWrapper active={isOpen} className={menuWrapperStyles} {...rest}>
      {/* TODO: component-ize this */}
      <div className={menuHeaderStyles}>
        <IconButton
          aria-label="Previous month"
          onClick={() => {
            onMonthChange(setMonth(month, getMonth(month) - 1));
          }}
        >
          <Icon glyph="ChevronLeft" />
        </IconButton>
        <div className={menuHeaderSelectContainerStyles}>
          <Select
            size="xsmall"
            aria-label="Select month"
            allowDeselect={false}
            value={month.getMonth().toString()}
            dropdownWidthBasis={DropdownWidthBasis.Option}
            onChange={m => {
              onMonthChange(setMonth(month, Number(m)));
            }}
          >
            {Months.map((m, i) => (
              <Option value={i.toString()} key={m.short}>
                {m.long}
              </Option>
            ))}
          </Select>
          <Select
            size="xsmall"
            aria-label="Select year"
            allowDeselect={false}
            value={month.getFullYear().toString()}
            dropdownWidthBasis={DropdownWidthBasis.Option}
            onChange={y => {
              onMonthChange(setYear(month, Number(y)));
            }}
          >
            {yearOptions.map(y => (
              <Option value={y.toString()} key={y}>
                {y}
              </Option>
            ))}
          </Select>
        </div>
        <IconButton
          aria-label="Next month"
          onClick={() => {
            onMonthChange(setMonth(month, getMonth(month) + 1));
          }}
        >
          <Icon glyph="ChevronRight" />
        </IconButton>
      </div>

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

      {/* DEBUG */}
      {/* <div>
        <small>Month: </small>
        <code>
          {getMonth(month) + 1}/{getYear(month)}
        </code>
      </div>
      <div>
        <small>Selected: </small>
        <code>{value?.toDateString()}</code>
      </div> */}
    </MenuWrapper>
  );
}

DatePickerMenu.displayName = 'DatePickerMenu';
