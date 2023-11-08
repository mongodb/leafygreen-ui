import React, {
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
} from 'react';
import { isBefore } from 'date-fns';
import range from 'lodash/range';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { usePopoverContext } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import { Option, Select } from '@leafygreen-ui/select';

import { useDatePickerContext } from '../../../shared/components/DatePickerContext';
import { Months, selectElementProps } from '../../../shared/constants';
import { isSameUTCMonth, setUTCMonth, setUTCYear } from '../../../shared/utils';
import { useSingleDateContext } from '../../SingleDateContext';
import {
  menuHeaderSelectContainerStyles,
  menuHeaderStyles,
  selectInputWidthStyles,
} from '../DatePickerMenu.styles';

import { shouldMonthBeEnabled } from './utils/getMonthOptions';

interface DatePickerMenuHeaderProps {
  setMonth: (newMonth: Date) => void;
}

/**
 * A helper component for DatePickerMenu.
 * Tests for this component are in DatePickerMenu
 * @internal
 */
export const DatePickerMenuHeader = forwardRef<
  HTMLDivElement,
  DatePickerMenuHeaderProps
>(({ setMonth, ...rest }: DatePickerMenuHeaderProps, fwdRef) => {
  const { min, max, isInRange } = useDatePickerContext();
  const { month } = useSingleDateContext();
  const { isPopoverOpen: isSelectMenuOpen } = usePopoverContext();

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

  /**
   * Calls the `updateMonth` helper with the appropriate month when a Chevron is clicked
   */
  const handleChevronClick =
    (dir: 'left' | 'right'): MouseEventHandler<HTMLButtonElement> =>
    e => {
      e.stopPropagation();
      e.preventDefault();
      const increment = dir === 'left' ? -1 : 1;
      const newMonthIndex = month.getUTCMonth() + increment;
      const newMonth = setUTCMonth(month, newMonthIndex);
      updateMonth(newMonth);
    };

  /**
   * Ensure that the date picker menu will not close when a select menu is open, focus is inside the select menu, and the ESC key is pressed.
   */
  const handleMenuHeaderKeydown: KeyboardEventHandler<HTMLDivElement> = e => {
    const { key } = e;
    key === 'Escape' &&
      console.log('handleMenuHeaderKeydown', {
        key,
        isSelectMenuOpen,
        targe: e.target.outerHTML,
      });

    // `isSelectMenuOpen` provided by `PopoverProvider` is `true` if any popover _within_ the menu is open
    if (key === keyMap.Escape && isSelectMenuOpen) {
      e.stopPropagation();
    }
  };

  useEffect(() => {
    console.log('isSelectMenuOpen changed', { isSelectMenuOpen });
  }, [isSelectMenuOpen]);

  /** Returns whether the provided month should be enabled */
  const isMonthEnabled = (monthName: string) =>
    shouldMonthBeEnabled(monthName, { month, min, max });

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={fwdRef}
      className={menuHeaderStyles}
      onKeyDown={handleMenuHeaderKeydown}
      {...rest}
    >
      <IconButton
        aria-label="Previous month"
        disabled={isSameUTCMonth(month, min)}
        onClick={handleChevronClick('left')}
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
          className={selectInputWidthStyles}
        >
          {Months.map((m, i) => (
            <Option
              disabled={!isMonthEnabled(m.long)}
              value={i.toString()}
              key={m.short}
            >
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
          className={selectInputWidthStyles}
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
        onClick={handleChevronClick('right')}
      >
        <Icon glyph="ChevronRight" />
      </IconButton>
    </div>
  );
});

DatePickerMenuHeader.displayName = 'DatePickerMenuHeader';
