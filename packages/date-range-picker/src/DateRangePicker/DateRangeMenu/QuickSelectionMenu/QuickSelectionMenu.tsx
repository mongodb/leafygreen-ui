import React, { MouseEventHandler } from 'react';
import { forwardRef } from 'react';
import { addDays } from 'date-fns';
import isFinite from 'lodash/isFinite';
import range from 'lodash/range';

import {
  MAX_DATE,
  MIN_DATE,
  Months,
  selectElementProps,
} from '@leafygreen-ui/date-picker/shared/constants';
import { useDatePickerContext } from '@leafygreen-ui/date-picker/shared/DatePickerContext';
import { DateRangeType } from '@leafygreen-ui/date-picker/shared/types';
import {
  isSameUTCMonth,
  setToUTCMidnight,
  setUTCMonth,
  setUTCYear,
} from '@leafygreen-ui/date-picker/utils';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Option, Select } from '@leafygreen-ui/select';
import { Overline } from '@leafygreen-ui/typography';

import { useDateRangeContext } from '../../DateRangeContext';

import { QuickRangeButton } from './QuickRangeButton';
import {
  quickSelectionClassName,
  quickSelectMenuMonthSelectContainerStyles,
  quickSelectMenuSelectionsContainerStyles,
  quickSelectMenuStyles,
  quickSelectMenuThemeStyles,
} from './QuickSelectionMenu.styles';

interface QuickRangeConfigObject {
  id: string;
  label: string;
  relativeRange: [number, number];
}

const quickRangeButtonsConfig: Array<QuickRangeConfigObject> = [
  { id: 'today', label: 'Today', relativeRange: [0, 0] },
  { id: 'yesterday', label: 'Yesterday', relativeRange: [-1, -1] },
  { id: 'last7', label: 'Last 7 days', relativeRange: [-7, 0] },
  { id: 'last30', label: 'Last 30 days', relativeRange: [-30, 0] },
  { id: 'last90', label: 'Last 90 days', relativeRange: [-90, 0] },
  { id: 'last12', label: 'Last 12 months', relativeRange: [-365, 0] },
  { id: 'all-time', label: 'All time', relativeRange: [-Infinity, 0] },
];

interface QuickSelectionMenuProps {}

export const QuickSelectionMenu = forwardRef<
  HTMLDivElement,
  QuickSelectionMenuProps
>((_, fwdRef) => {
  const { theme } = useDarkMode();
  const { setOpen, min, max, isInRange } = useDatePickerContext();
  const { setValue, handleValidation, month, setMonth, refs, today } =
    useDateRangeContext();

  // TODO: is this the right logic?
  const yearOptions = range(min.getUTCFullYear(), max.getUTCFullYear() + 1);

  // TODO: refine this logic
  const updateMonth = (newMonth: Date) => {
    if (isInRange(newMonth)) {
      setMonth(newMonth);
    }
  };

  const updateValue = (range?: DateRangeType) => {
    // When the value changes,
    if (range && range[0] && !isSameUTCMonth(range[0], month)) {
      updateMonth(setToUTCMidnight(range[0]));
    }

    handleValidation?.(range);
    setValue(range);
  };

  const quickRangeButtonHandler =
    (id: string): MouseEventHandler<HTMLButtonElement> =>
    () => {
      const quickRange = quickRangeButtonsConfig.find(r => r.id === id);

      if (quickRange) {
        const relativeStart = quickRange.relativeRange[0];
        const relativeEnd = quickRange.relativeRange[1];

        const start = isFinite(relativeStart)
          ? addDays(today, relativeStart)
          : MIN_DATE;
        const end = isFinite(relativeEnd)
          ? addDays(today, relativeEnd)
          : MAX_DATE;

        updateValue([start, end]);
        setOpen(false);
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
        {quickRangeButtonsConfig.map(({ id, label }) => (
          <QuickRangeButton
            key={id}
            ref={refs.quickRangeButtonRefs(id)}
            label={label}
            onClick={quickRangeButtonHandler(id)}
          />
        ))}
      </div>
    </div>
  );
});

QuickSelectionMenu.displayName = 'QuickSelectionMenu';
