import React, { forwardRef } from 'react';
import { isBefore } from 'date-fns';
import range from 'lodash/range';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { DropdownWidthBasis, Option, Select } from '@leafygreen-ui/select';

import { Months } from '../../../constants';
import { useDatePickerContext } from '../../../DatePickerContext';
import { isSameUTCMonth } from '../../../utils/isSameUTCMonth';
import { setUTCMonth } from '../../../utils/setUTCMonth';
import { setUTCYear } from '../../../utils/setUTCYear';
import {
  menuHeaderSelectContainerStyles,
  menuHeaderStyles,
} from '../DatePickerMenu.styles';

interface DatePickerMenuHeaderProps {
  month: Date;
  setMonth: (newMonth: Date) => void;
}

const selectElementProps = {
  size: 'xsmall',
  allowDeselect: false,
  dropdownWidthBasis: DropdownWidthBasis.Option,
  // using no portal so the select menus are included in the backdrop "foreground"
  // there is currently no way to pass a ref into the Select portal to use in backdrop "foreground"
  usePortal: false,
} as const;

/**
 * A helper component for DatePickerMenu.
 * Tests for this component are in DatePickerMenu
 * @internal
 */
export const DatePickerMenuHeader = forwardRef<
  HTMLDivElement,
  DatePickerMenuHeaderProps
>(({ month, setMonth }: DatePickerMenuHeaderProps, fwdRef) => {
  const { min, max, isInRange } = useDatePickerContext();

  const yearOptions = range(min.getUTCFullYear(), max.getUTCFullYear() + 1);

  const updateMonth = (newMonth: Date) => {
    // TODO: may need to update this function to check if the months are in range
    // (could cause errors when the min date is near the end of the month)
    if (isInRange(newMonth)) {
      setMonth(newMonth);
    } else if (isBefore(newMonth, min)) {
      // if the selected month is not in range,
      // set the month to the first or last possible month
      setMonth(min);
    } else {
      setMonth(max);
    }
  };

  const prevMonth = month.getUTCMonth() - 1;
  const nextMonth = month.getUTCMonth() + 1;

  return (
    <div ref={fwdRef} className={menuHeaderStyles}>
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
          {...selectElementProps}
          aria-label="Select month"
          value={month.getUTCMonth().toString()}
          onChange={m => {
            const newMonth = setUTCMonth(month, Number(m));
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
          {...selectElementProps}
          aria-label="Select year"
          value={month.getUTCFullYear().toString()}
          onChange={y => {
            const newMonth = setUTCYear(month, Number(y));
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
});

DatePickerMenuHeader.displayName = 'DatePickerMenuHeader';
