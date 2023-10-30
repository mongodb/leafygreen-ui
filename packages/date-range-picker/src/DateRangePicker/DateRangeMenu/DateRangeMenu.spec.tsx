import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addDays, subDays } from 'date-fns';

import { Month } from '@leafygreen-ui/date-picker/shared/constants';
import { newUTC } from '@leafygreen-ui/date-picker/utils';

import {
  DatePickerProvider,
  DatePickerProviderProps,
  defaultDatePickerContext,
} from '../../DatePickerContext';
import { DateRangeType } from '../../types';
import {
  DateRangeProvider,
  type DateRangeProviderProps,
} from '../DateRangeContext';
import { testToday } from '../DateRangePicker.testutils';

import { DateRangeMenu, type DateRangeMenuProps } from '.';

const renderDateRangeMenu = (args?: {
  props?: DateRangeMenuProps;
  rangeContext?: Partial<DateRangeProviderProps>;
  datePickerContext?: Partial<DatePickerProviderProps>;
}) => {
  const results = render(
    <DatePickerProvider
      value={{
        ...defaultDatePickerContext,
        ...args?.datePickerContext,
        initialOpen: true,
      }}
    >
      <DateRangeProvider
        value={undefined}
        setValue={() => {}}
        handleValidation={() => {}}
        rootRef={React.createRef()}
        {...args?.rangeContext}
      >
        <DateRangeMenu {...args?.props} />
      </DateRangeProvider>
    </DatePickerProvider>,
  );

  const calendarCells = results.getAllByTestId('lg-date_picker-calendar_cell');
  const todayCell = calendarCells.find(
    cell => cell.getAttribute('aria-current') === 'true',
  );
  const getCellForDate = (date: Date) =>
    calendarCells.find(cell => cell.dataset.iso === date.toISOString());

  return { ...results, calendarCells, todayCell, getCellForDate };
};

describe('packages/date-picker/date-range-picker/menu', () => {
  beforeAll(() => {
    // Set the current time to midnight UTC on 2023-12-26
    jest.useFakeTimers().setSystemTime(testToday);
  });

  test('initial focus is on `today`', () => {
    const { todayCell } = renderDateRangeMenu();
    expect(todayCell).toHaveFocus();
  });

  describe('Keyboard navigation', () => {
    describe('Arrow Keys', () => {
      const initialStart = newUTC(2023, Month.September, 14);
      const value = [initialStart, null] as DateRangeType;
      const rangeContext = { value };

      describe('default behavior', () => {
        test('left arrow moves focus to the previous day', () => {
          const { getCellForDate } = renderDateRangeMenu({ rangeContext });
          userEvent.keyboard('{leftarrow}');
          const focusedCell = getCellForDate(subDays(initialStart, 1));
          expect(focusedCell).toHaveFocus();
        });
        test('right arrow moves focus to the next day', () => {
          const { getCellForDate } = renderDateRangeMenu({ rangeContext });
          userEvent.keyboard('{rightarrow}');
          const focusedCell = getCellForDate(addDays(initialStart, 1));
          expect(focusedCell).toHaveFocus();
        });
        test('up arrow moves focus to the previous week', () => {
          const { getCellForDate } = renderDateRangeMenu({ rangeContext });
          userEvent.keyboard('{uparrow}');
          const focusedCell = getCellForDate(subDays(initialStart, 7));
          expect(focusedCell).toHaveFocus();
        });
        test('down arrow moves focus to the next week', () => {
          const { getCellForDate } = renderDateRangeMenu({ rangeContext });
          userEvent.keyboard('{downarrow}');
          const focusedCell = getCellForDate(addDays(initialStart, 7));
          expect(focusedCell).toHaveFocus();
        });
      });

      describe('when next day would be out of range', () => {
        test('left arrow does nothing', () => {
          const { getCellForDate } = renderDateRangeMenu({
            rangeContext,
            datePickerContext: { min: subDays(initialStart, 1) },
          });
          userEvent.keyboard('{leftarrow}');
          const focusedCell = getCellForDate(initialStart);
          expect(focusedCell).toHaveFocus();
        });
        test('right arrow does nothing', () => {
          const { getCellForDate } = renderDateRangeMenu({
            rangeContext,
            datePickerContext: { max: addDays(initialStart, 1) },
          });
          userEvent.keyboard('{rightarrow}');
          const focusedCell = getCellForDate(initialStart);
          expect(focusedCell).toHaveFocus();
        });
        test('up arrow does nothing', () => {
          const { getCellForDate } = renderDateRangeMenu({
            rangeContext,
            datePickerContext: { min: subDays(initialStart, 6) },
          });
          userEvent.keyboard('{uparrow}');
          const focusedCell = getCellForDate(initialStart);
          expect(focusedCell).toHaveFocus();
        });
        test('down arrow does nothing', () => {
          const { getCellForDate } = renderDateRangeMenu({
            rangeContext,
            datePickerContext: { max: addDays(initialStart, 7) },
          });
          userEvent.keyboard('{downarrow}');
          const focusedCell = getCellForDate(initialStart);
          expect(focusedCell).toHaveFocus();
        });
      });

      describe('update the displayed month', () => {
        test('left arrow updates displayed month to previous', () => {
          const { getAllByRole } = renderDateRangeMenu({
            rangeContext: { value: [newUTC(2023, Month.September, 1), null] },
          });
          userEvent.keyboard('{leftarrow}');
          const calendarGrids = getAllByRole('grid');
          expect(calendarGrids[0]).toHaveAttribute('aria-label', 'August 2023');
        });
        test('right arrow updates displayed month to next', () => {
          const { getAllByRole } = renderDateRangeMenu({
            rangeContext: { value: [newUTC(2023, Month.September, 30), null] },
          });
          userEvent.keyboard('{rightarrow}');
          const calendarGrids = getAllByRole('grid');
          expect(calendarGrids[0]).toHaveAttribute(
            'aria-label',
            'October 2023',
          );
        });
        test('up arrow updates displayed month to previous', () => {
          const { getAllByRole } = renderDateRangeMenu({
            rangeContext: { value: [newUTC(2023, Month.September, 6), null] },
          });
          userEvent.keyboard('{uparrow}');
          const calendarGrids = getAllByRole('grid');
          expect(calendarGrids[0]).toHaveAttribute('aria-label', 'August 2023');
        });
        test('down arrow updates displayed month to next', () => {
          const { getAllByRole } = renderDateRangeMenu({
            rangeContext: { value: [newUTC(2023, Month.September, 24), null] },
          });
          userEvent.keyboard('{downarrow}');
          const calendarGrids = getAllByRole('grid');
          expect(calendarGrids[0]).toHaveAttribute(
            'aria-label',
            'October 2023',
          );
        });
        test('does not update month when month does not need to change', () => {
          const { getAllByRole } = renderDateRangeMenu({
            rangeContext: { value: [testToday, null] },
          });
          userEvent.keyboard('{downarrow}');
          const calendarGrids = getAllByRole('grid');
          expect(calendarGrids[0]).toHaveAttribute(
            'aria-label',
            'October 2023',
          );
        });
      });

      describe('when month should be updated', () => {
        test('left arrow focuses the previous day', () => {
          const { getCellForDate } = renderDateRangeMenu({
            rangeContext: { value: [newUTC(2023, Month.September, 1), null] },
          });
          userEvent.keyboard('{leftarrow}');
          const focusedCell = getCellForDate(newUTC(2023, Month.August, 31));
          expect(focusedCell).toHaveFocus();
        });
        test('right arrow focuses the next day', () => {
          const { getCellForDate } = renderDateRangeMenu({
            rangeContext: { value: [newUTC(2023, Month.September, 30), null] },
          });
          userEvent.keyboard('{rightarrow}');
          const focusedCell = getCellForDate(newUTC(2023, Month.October, 1));
          expect(focusedCell).toHaveFocus();
        });
        test('up arrow focuses the previous week', () => {
          const { getCellForDate } = renderDateRangeMenu({
            rangeContext: { value: [newUTC(2023, Month.September, 6), null] },
          });
          userEvent.keyboard('{uparrow}');
          const focusedCell = getCellForDate(newUTC(2023, Month.August, 31));
          expect(focusedCell).toHaveFocus();
        });
        test('down arrow focuses the next week', () => {
          const { getCellForDate } = renderDateRangeMenu({
            rangeContext: { value: [newUTC(2023, Month.September, 24), null] },
          });
          userEvent.keyboard('{downarrow}');
          const focusedCell = getCellForDate(newUTC(2023, Month.October, 1));
          expect(focusedCell).toHaveFocus();
        });
      });
    });
  });
});
