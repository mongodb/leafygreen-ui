import React from 'react';
import {
  getMonth,
  getYear,
  isBefore,
  isSameMonth,
  setMonth,
  setYear,
} from 'date-fns';
import { range } from 'lodash';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { DropdownWidthBasis, Option, Select } from '@leafygreen-ui/select';

import { Months } from '../../../constants';
import { useDatePickerContext } from '../../../DatePickerContext';
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

  const yearOptions = range(getYear(min), getYear(max) + 1);

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

  return (
    <div className={menuHeaderStyles}>
      <IconButton
        aria-label="Previous month"
        disabled={isSameMonth(month, min)}
        onClick={() => {
          const newMonth = setMonth(month, getMonth(month) - 1);
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
          value={month.getMonth().toString()}
          dropdownWidthBasis={DropdownWidthBasis.Option}
          onChange={m => {
            const newMonth = setMonth(month, Number(m));
            updateMonth(newMonth);
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
            const newMonth = setYear(month, Number(y));
            updateMonth(newMonth);
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
        disabled={isSameMonth(month, max)}
        onClick={() => {
          const newMonth = setMonth(month, getMonth(month) + 1);
          updateMonth(newMonth);
        }}
      >
        <Icon glyph="ChevronRight" />
      </IconButton>
    </div>
  );
};
