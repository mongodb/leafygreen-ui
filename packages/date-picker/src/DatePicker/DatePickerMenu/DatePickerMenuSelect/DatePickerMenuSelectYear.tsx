import React from 'react';
import range from 'lodash/range';

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
  onChange: (v: string) => void;
}

/**
 * Year Select
 * @internal
 */
export const DatePickerMenuSelectYear = ({
  onChange,
}: DatePickerMenuSelectYearProps) => {
  const { setIsSelectOpen, min, max } = useSharedDatePickerContext();
  const { month } = useDatePickerContext();
  const yearOptions = range(min.getUTCFullYear(), max.getUTCFullYear() + 1);

  return (
    <Select
      {...selectElementProps}
      aria-label="Select year"
      value={month.getUTCFullYear().toString()}
      onChange={onChange}
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
