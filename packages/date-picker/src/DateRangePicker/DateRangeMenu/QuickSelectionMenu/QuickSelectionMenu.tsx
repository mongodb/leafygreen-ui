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
import { useDateRangeContext } from '../../DateRangeContext';

import { QuickRangeButton } from './QuickRangeButton';
import {
  quickSelectionClassName,
  quickSelectMenuMonthSelectContainerStyles,
  quickSelectMenuSelectionsContainerStyles,
  quickSelectMenuStyles,
  quickSelectMenuThemeStyles,
} from './QuickSelectionMenu.styles';

interface QuickSelectionMenuProps {}

export const QuickSelectionMenu = forwardRef<
  HTMLDivElement,
  QuickSelectionMenuProps
>((_, fwdRef) => {
  const { theme } = useDarkMode();
  const { min, max, isInRange } = useDatePickerContext();
  const { month, setMonth, refs } = useDateRangeContext();

  // TODO: is this the right logic?
  const yearOptions = range(min.getUTCFullYear(), max.getUTCFullYear() + 1);

  // TODO: refine this logic
  const updateMonth = (newMonth: Date) => {
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
      data-testid="lg-date_picker-menu-quick_select"
    >
      <div className={quickSelectMenuMonthSelectContainerStyles}>
        <Select
          {...selectElementProps}
          ref={refs.selectRefs('month')}
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
          ref={refs.selectRefs('year')}
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
        <QuickRangeButton
          ref={refs.quickRangeButtonRefs('today')}
          label="Today"
        />
        <QuickRangeButton
          ref={refs.quickRangeButtonRefs('yesterday')}
          label="Yesterday"
        />
        <QuickRangeButton
          ref={refs.quickRangeButtonRefs('last7')}
          label="Last 7 days"
        />
        <QuickRangeButton
          ref={refs.quickRangeButtonRefs('last30')}
          label="Last 30 days"
        />
        <QuickRangeButton
          ref={refs.quickRangeButtonRefs('last90')}
          label="Last 90 days"
        />
        <QuickRangeButton
          ref={refs.quickRangeButtonRefs('last12')}
          label="Last 12 months"
        />
        <QuickRangeButton
          ref={refs.quickRangeButtonRefs('all-time')}
          label="All time"
        />
      </div>
    </div>
  );
});

QuickSelectionMenu.displayName = 'QuickSelectionMenu';
