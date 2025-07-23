import React, { useCallback } from 'react';

import { getLocaleMonths, setUTCMonth } from '@leafygreen-ui/date-utils';
import { cx } from '@leafygreen-ui/emotion';
import { Option, Select } from '@leafygreen-ui/select';

import { selectElementProps } from '../../../shared/constants';
import { useSharedDatePickerContext } from '../../../shared/context';
import { useDatePickerContext } from '../../DatePickerContext';
import {
  selectInputWidthStyles,
  selectTruncateStyles,
} from '../DatePickerMenu.styles';
import { shouldMonthBeEnabled } from '../DatePickerMenuHeader/utils';

interface DatePickerMenuSelectMonthProps {
  updateMonth: (newMonth: Date) => void;
}

/**
 * Month Select
 * @internal
 */
export const DatePickerMenuSelectMonth = ({
  updateMonth,
}: DatePickerMenuSelectMonthProps) => {
  const { setIsSelectOpen, locale, min, max } = useSharedDatePickerContext();
  const { month } = useDatePickerContext();
  const monthOptions = getLocaleMonths(locale);

  /** Returns whether the provided month should be enabled */
  const isMonthEnabled = useCallback(
    (monthName: string) =>
      shouldMonthBeEnabled(monthName, { month, min, max, locale }),
    [locale, max, min, month],
  );

  const handleMonthOnChange = (value: string) => {
    const newMonth = setUTCMonth(month, Number(value));
    updateMonth(newMonth);
  };

  return (
    <Select
      {...selectElementProps}
      aria-label={`Select month - ${
        monthOptions[month.getUTCMonth()].long
      } selected`}
      value={month.getUTCMonth().toString()}
      onChange={handleMonthOnChange}
      className={cx(selectTruncateStyles, selectInputWidthStyles)}
      onEntered={() => setIsSelectOpen(true)}
      onExited={() => setIsSelectOpen(false)}
      placeholder={monthOptions[month.getUTCMonth()].short}
    >
      {monthOptions.map((m, i) => (
        <Option
          disabled={!isMonthEnabled(m.long)}
          value={i.toString()}
          key={m.short}
          aria-label={m.long}
        >
          {m.short}
        </Option>
      ))}
    </Select>
  );
};

DatePickerMenuSelectMonth.displayName = 'DatePickerMenuSelectMonth';
