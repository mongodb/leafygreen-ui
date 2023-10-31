import React, {
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
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
import { DatePickerProps } from '../../DatePicker.types';
import {
  menuHeaderSelectContainerStyles,
  menuHeaderStyles,
  selectInputWidthStyles,
} from '../DatePickerMenu.styles';

type DatePickerMenuHeaderProps = {
  month: Date;
  setMonth: (newMonth: Date) => void;
} & Pick<DatePickerProps, 'handleValidation' | 'value'>;

/**
 * A helper component for DatePickerMenu.
 * Tests for this component are in DatePickerMenu
 * @internal
 */
export const DatePickerMenuHeader = forwardRef<
  HTMLDivElement,
  DatePickerMenuHeaderProps
>(
  (
    { month, setMonth, value, handleValidation }: DatePickerMenuHeaderProps,
    fwdRef,
  ) => {
    const { min, max, isInRange, setOpen } = useDatePickerContext();
    const { isPopoverOpen } = usePopoverContext();

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

    // `isPopoverOpen` updated value is not accessible in `<DatePickerMenu>` since the `<PopoverProvider>` is inside `<MenuWrapper>`
    const handleEcsPress: KeyboardEventHandler<HTMLDivElement> = e => {
      console.log('handleEcsPress', e.key, { isPopoverOpen });
      // This check is to ensure that the date picker menu will not close when a select menu is open, focus is inside the select menu, and the ESC key is pressed.
      if (!isPopoverOpen && e.key === keyMap.Escape) {
        console.log('😈😈😈😈😈😈');
        setOpen(false);
        handleValidation?.(value);
      }
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div ref={fwdRef} className={menuHeaderStyles} onKeyDown={handleEcsPress}>
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
  },
);

DatePickerMenuHeader.displayName = 'DatePickerMenuHeader';
