import React from 'react';
import { forwardRef } from 'react';
import range from 'lodash/range';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Option, Select } from '@leafygreen-ui/select';
import { Overline } from '@leafygreen-ui/typography';

import { Months, selectElementProps } from '../../../constants';
import { useDatePickerContext } from '../../../DatePickerContext';
import { setUTCMonth, setUTCYear } from '../../../utils';
import { useDateRangeMenuContext } from '../DateRangeMenuContext';

import { QuickRangeButton } from './QuickRangeButton';
import {
  quickSelectMenuMonthSelectContainerStyles,
  quickSelectMenuSelectionsContainerStyles,
  quickSelectMenuStyles,
  quickSelectMenuThemeStyles,
} from './QuickSelectionMenu.styles';

export const QuickSelectionMenu = forwardRef<HTMLDivElement, {}>(
  (_props, fwdRef) => {
    const { theme } = useDarkMode();
    const { min, max, isInRange } = useDatePickerContext();
    const { month, setMonth } = useDateRangeMenuContext();

    // TODO: is this the right logic?
    const yearOptions = range(min.getUTCFullYear(), max.getUTCFullYear() + 1);

    const updateMonth = (newMonth: Date) => {
      // TODO: refine this logic
      if (isInRange(newMonth)) {
        setMonth(newMonth);
      }
    };

    return (
      <div
        ref={fwdRef}
        className={cx(quickSelectMenuStyles, quickSelectMenuThemeStyles[theme])}
      >
        <div className={quickSelectMenuMonthSelectContainerStyles}>
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
                {m.short}
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
        <div className={quickSelectMenuSelectionsContainerStyles}>
          <Overline>Quick Ranges:</Overline>
          {/*
           TODO: this functionality
           Do we want to set these up in some config object?
           */}
          <QuickRangeButton>Today</QuickRangeButton>
          <QuickRangeButton>Yesterday</QuickRangeButton>
          <QuickRangeButton>Last 7 days</QuickRangeButton>
          <QuickRangeButton>Last 30 days</QuickRangeButton>
          <QuickRangeButton>Last 90 days</QuickRangeButton>
          <QuickRangeButton>Last 12 months</QuickRangeButton>
          <QuickRangeButton>All time</QuickRangeButton>
        </div>
      </div>
    );
  },
);

QuickSelectionMenu.displayName = 'DateRangeMenuQuickSelection';
