import React from 'react';
import { isBefore, setYear } from 'date-fns';
import range from 'lodash/range';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { DropdownWidthBasis, Option, Select } from '@leafygreen-ui/select';

import { Months } from '../../../constants';
import { useDatePickerContext } from '../../../DatePickerContext';
import { isSameUTCMonth } from '../../../utils/isSameUTCMonth';
import { setUTCMonth } from '../../../utils/setUTCMonth';
import {
  menuHeaderSelectContainerStyles,
  menuHeaderStyles,
} from '../DatePickerMenu.styles';
import { DatePickerMenuProps } from '../DatePickerMenu.types';

type DatePickerMenuHeaderProps = Pick<
  DatePickerMenuProps,
  'month' | 'onMonthChange'
>;

export const DatePickerMenuHeader = ({
  month,
  onMonthChange,
}: DatePickerMenuHeaderProps) => {
  const { min, max, isInRange } = useDatePickerContext();

  const yearOptions = range(min.getUTCFullYear(), max.getUTCFullYear() + 1);

  const updateMonth = (newMonth: Date) => {
    // TODO: may need to update this function to check if the months are in range
    // (could cause errors when the min date is near the end of the month)
    if (isInRange(newMonth)) {
      onMonthChange(newMonth);
    } else if (isBefore(newMonth, min)) {
      // if the selected month is not in range,
      // set the month to the first or last possible month
      onMonthChange(min);
    } else {
      onMonthChange(max);
    }
  };

  const prevMonth = month.getUTCMonth() - 1;
  const nextMonth = month.getUTCMonth() + 1;

  return (
    <div className={menuHeaderStyles}>
      <IconButton
        aria-label="Previous month"
        disabled={isSameUTCMonth(month, min)}
        onClick={() => {
          const newMonth = setUTCMonth(month, prevMonth);
          updateMonth(newMonth);
        }}
      >
        <Icon glyph="ChevronLeft" />
      </IconButton>
      <div className={menuHeaderSelectContainerStyles}>
        <Select
          size="xsmall"
          aria-label="Select month"
          allowDeselect={false}
          value={month.getUTCMonth().toString()}
          dropdownWidthBasis={DropdownWidthBasis.Option}
          onChange={m => {
            const newMonth = setUTCMonth(month, Number(m));
            updateMonth(newMonth);
          }}
          usePortal={false}
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
            const newMonth = setYear(month, Number(y));
            updateMonth(newMonth);
          }}
          usePortal={false}
          popoverZIndex={2}
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
        disabled={isSameUTCMonth(month, max)}
        onClick={() => {
          const newMonth = setUTCMonth(month, nextMonth);
          updateMonth(newMonth);
        }}
      >
        <Icon glyph="ChevronRight" />
      </IconButton>
    </div>
  );
};
