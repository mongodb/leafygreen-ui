import React from 'react';
import { forwardRef } from 'react';
import range from 'lodash/range';

import { cx } from '@leafygreen-ui/emotion';
import { DynamicRefGetter } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Option, Select } from '@leafygreen-ui/select';
import { Overline } from '@leafygreen-ui/typography';

import { Months, selectElementProps } from '../../../constants';
import { useDatePickerContext } from '../../../DatePickerContext';
import { setUTCMonth, setUTCYear } from '../../../utils';
import { useDateRangeMenuContext } from '../DateRangeMenuContext';

import { QuickRangeButton } from './QuickRangeButton';
import {
  quickSelectionClassName,
  quickSelectMenuMonthSelectContainerStyles,
  quickSelectMenuSelectionsContainerStyles,
  quickSelectMenuStyles,
  quickSelectMenuThemeStyles,
} from './QuickSelectionMenu.styles';

interface QuickSelectionMenuProps {
  selectRefs: DynamicRefGetter<HTMLButtonElement>;
  quickRangeButtonRefs: DynamicRefGetter<HTMLButtonElement>;
}

export const QuickSelectionMenu = forwardRef<
  HTMLDivElement,
  QuickSelectionMenuProps
>(({ selectRefs, quickRangeButtonRefs }, fwdRef) => {
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
      className={cx(
        quickSelectionClassName,
        quickSelectMenuStyles,
        quickSelectMenuThemeStyles[theme],
      )}
      data-lg="date-range_menu_quick-select"
    >
      <div className={quickSelectMenuMonthSelectContainerStyles}>
        <Select
          {...selectElementProps}
          ref={selectRefs('month')}
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
          ref={selectRefs('year')}
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
        <QuickRangeButton ref={quickRangeButtonRefs('today')} label="Today" />
        <QuickRangeButton
          ref={quickRangeButtonRefs('yesterday')}
          label="Yesterday"
        />
        <QuickRangeButton
          ref={quickRangeButtonRefs('last7')}
          label="Last 7 days"
        />
        <QuickRangeButton
          ref={quickRangeButtonRefs('last30')}
          label="Last 30 days"
        />
        <QuickRangeButton
          ref={quickRangeButtonRefs('last90')}
          label="Last 90 days"
        />
        <QuickRangeButton
          ref={quickRangeButtonRefs('last12')}
          label="Last 12 months"
        />
        <QuickRangeButton
          ref={quickRangeButtonRefs('all-time')}
          label="All time"
        />
      </div>
    </div>
  );
});

QuickSelectionMenu.displayName = 'QuickSelectionMenu';
