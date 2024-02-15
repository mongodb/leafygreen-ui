import React from 'react';
import range from 'lodash/range';

import { setUTCYear } from '@leafygreen-ui/date-utils';
import { cx } from '@leafygreen-ui/emotion';
import { Option, Select } from '@leafygreen-ui/select';

import { selectElementProps } from '../../../shared/constants';
import { useSharedDatePickerContext } from '../../../shared/context';
import { useDatePickerContext } from '../../DatePickerContext';
import {
  selectInputWidthStyles,
  selectTruncateStyles,
} from '../DatePickerMenu.styles';

interface DatePickerMenuSelectYearProps {
  updateMonth: (newMonth: Date) => void;
}

/**
 * Year Select
 * @internal
 */
export const DatePickerMenuSelectYear = ({
  updateMonth,
}: DatePickerMenuSelectYearProps) => {
  const { setIsSelectOpen, min, max } = useSharedDatePickerContext();
  const { month } = useDatePickerContext();
  const yearOptions = range(min.getUTCFullYear(), max.getUTCFullYear() + 1);

  const handleYearOnChange = (value: string) => {
    const newMonth = setUTCYear(month, Number(value));
    updateMonth(newMonth);
  };

  return (
    <Select
      {...selectElementProps}
      aria-label={`Select year - ${month.getUTCFullYear().toString()} selected`}
      value={month.getUTCFullYear().toString()}
      onChange={handleYearOnChange}
      className={cx(selectTruncateStyles, selectInputWidthStyles)}
      onEntered={() => setIsSelectOpen(true)}
      onExited={() => setIsSelectOpen(false)}
      placeholder={month.getUTCFullYear().toString()}
    >
      {yearOptions.map(y => (
        <Option value={y.toString()} key={y} aria-label={y.toString()}>
          {y}
        </Option>
      ))}
    </Select>
  );
};

DatePickerMenuSelectYear.displayName = 'DatePickerMenuSelectYear';
