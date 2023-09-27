import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addDays, subDays } from 'date-fns';

import { Month } from '../../constants';
import {
  DatePickerProvider,
  DatePickerProviderProps,
} from '../../DatePickerContext';
import { defaultDatePickerContext } from '../../DatePickerContext/DatePickerContext.utils';
import { newUTC } from '../../utils/newUTC';
import { setUTCDate } from '../../utils/setUTCDate';

import { DatePickerMenu, DatePickerMenuProps } from '.';

const testToday = new Date(Date.UTC(2023, Month.September, 10));
const testValue = new Date(Date.UTC(2023, Month.September, 14));

const renderDatePickerMenu = (
  props?: Partial<DatePickerMenuProps>,
  context?: Partial<DatePickerProviderProps>,
) => {
  const result = render(
    <DatePickerProvider value={{ ...defaultDatePickerContext, ...context }}>
      <DatePickerMenu isOpen value={null} onCellClick={() => {}} {...props} />,
    </DatePickerProvider>,
  );

  const rerenderDatePickerMenu = (newProps?: Partial<DatePickerMenuProps>) =>
    result.rerender(
      <DatePickerProvider value={{ ...defaultDatePickerContext, ...context }}>
        <DatePickerMenu
          isOpen
          value={null}
          onCellClick={() => {}}
          {...({ ...props, ...newProps } as Partial<DatePickerMenuProps>)}
        />
        ,
      </DatePickerProvider>,
    );

  const calendarGrid = result.getByRole('grid');

  const calendarCells = result.queryAllByRole(
    'gridcell',
  ) as Array<HTMLTableCellElement>;

  const todayCell = calendarGrid.querySelector(
    `[data-iso="${testToday.toISOString()}"]`,
  );

  const getCellWithValue = (date: Date) =>
    calendarGrid.querySelector(`[data-iso="${date.toISOString()}"]`);

  return {
    ...result,
    rerenderDatePickerMenu,
    calendarGrid,
    calendarCells,
    todayCell,
    getCellWithValue,
  };
};

describe('packages/date-picker/date-picker-menu', () => {
  beforeEach(() => {
    // Set the current time to midnight UTC on 2023-09-10
    jest.useFakeTimers().setSystemTime(testToday);
  });

  describe('Rendering', () => {
    test('renders calendar grid', () => {
      const result = renderDatePickerMenu();
      expect(result.getByRole('grid')).toBeInTheDocument();
    });
    test('grid is labelled as the current month', () => {
      const result = renderDatePickerMenu();
      const grid = result.getByRole('grid');
      expect(grid).toHaveAttribute('aria-label', 'September 2023');
    });
    test('chevrons have aria labels', () => {
      const result = renderDatePickerMenu();
      const leftChevron = result.getByLabelText('Previous month');
      const rightChevron = result.getByLabelText('Next month');
      expect(leftChevron).toBeInTheDocument();
      expect(rightChevron).toBeInTheDocument();
    });
    test('select menu triggers have aria labels', () => {
      const result = renderDatePickerMenu();
      const monthSelect = result.getByLabelText('Select month');
      const yearSelect = result.getByLabelText('Select year');
      expect(monthSelect).toBeInTheDocument();
      expect(yearSelect).toBeInTheDocument();
    });
    test('select menus have correct values', () => {
      const result = renderDatePickerMenu();
      const monthSelect = result.getByLabelText('Select month');
      const yearSelect = result.getByLabelText('Select year');
      expect(monthSelect).toHaveValue(Month.September.toString());
      expect(yearSelect).toHaveValue('2023');
    });

    describe('rendered cells', () => {
      test('have correct `aria-label`', () => {
        const { todayCell } = renderDatePickerMenu();
        expect(todayCell).toHaveAttribute('aria-label', 'Sun Sep 10 2023');
      });
    });

    describe('when value is updated', () => {
      test('grid is labelled as the current month', () => {
        const { getByRole, rerenderDatePickerMenu } = renderDatePickerMenu();
        rerenderDatePickerMenu({ value: newUTC(2024, Month.March, 10) });
        const grid = getByRole('grid');
        expect(grid).toHaveAttribute('aria-label', 'March 2024');
      });
      test('select menus have correct values', () => {
        const { getByLabelText, rerenderDatePickerMenu } =
          renderDatePickerMenu();
        rerenderDatePickerMenu({ value: newUTC(2024, Month.March, 10) });

        const monthSelect = getByLabelText('Select month');
        const yearSelect = getByLabelText('Select year');
        expect(monthSelect).toHaveValue(Month.March.toString());
        expect(yearSelect).toHaveValue('2024');
      });
    });
  });

  describe('Keyboard navigation', () => {
    test('default highlight is on today', () => {
      const { todayCell } = renderDatePickerMenu();
      userEvent.tab();
      expect(todayCell).toHaveFocus();
    });

    test('highlight starts on on current value when provided', () => {
      const { getCellWithValue } = renderDatePickerMenu({
        value: testValue,
      });
      userEvent.tab();
      const valueCell = getCellWithValue(testValue);
      expect(valueCell).toHaveFocus();
    });

    describe('Arrow Keys', () => {
      test('left arrow moves focus to the previous day', async () => {
        const { getCellWithValue } = renderDatePickerMenu({
          value: testValue,
        });
        userEvent.tab();
        userEvent.keyboard('{arrowleft}');

        const prevDay = getCellWithValue(setUTCDate(testValue, 13));
        expect(prevDay).toHaveFocus();
      });

      test('right arrow moves focus to the next day', () => {
        const { getCellWithValue } = renderDatePickerMenu({
          value: testValue,
        });
        userEvent.tab();
        userEvent.keyboard('{arrowright}');
        const nextDay = getCellWithValue(setUTCDate(testValue, 15));
        expect(nextDay).toHaveFocus();
      });

      test('up arrow moves focus to the previous week', () => {
        const { getCellWithValue } = renderDatePickerMenu({
          value: testValue,
        });
        userEvent.tab();
        userEvent.keyboard('{arrowup}');

        const prevWeek = getCellWithValue(setUTCDate(testValue, 7));
        expect(prevWeek).toHaveFocus();
      });

      test('down arrow moves focus to the next week', () => {
        const { getCellWithValue } = renderDatePickerMenu({
          value: testValue,
        });
        userEvent.tab();
        userEvent.keyboard('{arrowdown}');

        const nextWeek = getCellWithValue(setUTCDate(testValue, 21));
        expect(nextWeek).toHaveFocus();
      });

      describe('when next day would be out of range', () => {
        const props = {
          value: testToday,
        };
        test('left arrow does nothing', () => {
          const { todayCell } = renderDatePickerMenu(props, {
            min: testToday,
          });
          userEvent.tab();
          userEvent.keyboard('{arrowleft}');
          expect(todayCell).toHaveFocus();
        });

        test('right arrow does nothing', () => {
          const { todayCell } = renderDatePickerMenu(props, {
            max: testToday,
          });
          userEvent.tab();
          userEvent.keyboard('{arrowright}');
          expect(todayCell).toHaveFocus();
        });

        test('up arrow does nothing', () => {
          const { todayCell } = renderDatePickerMenu(props, {
            min: addDays(testToday, -6),
          });
          userEvent.tab();
          userEvent.keyboard('{arrowup}');
          expect(todayCell).toHaveFocus();
        });
        test('down arrow does nothing', () => {
          const { todayCell } = renderDatePickerMenu(props, {
            max: addDays(testToday, 6),
          });
          userEvent.tab();
          userEvent.keyboard('{arrowdown}');
          expect(todayCell).toHaveFocus();
        });
      });

      describe('update the displayed month', () => {
        test('left arrow updates displayed month to previous', () => {
          const value = new Date(Date.UTC(2023, Month.September, 1));
          const { calendarGrid } = renderDatePickerMenu({ value });
          userEvent.tab();
          userEvent.keyboard('{arrowleft}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'August 2023');
        });

        test('right arrow updates displayed month to next', () => {
          const value = new Date(Date.UTC(2023, Month.September, 30));
          const { calendarGrid } = renderDatePickerMenu({ value });
          userEvent.tab();
          userEvent.keyboard('{arrowright}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'October 2023');
        });

        test('up arrow updates displayed month to previous', () => {
          const value = new Date(Date.UTC(2023, Month.September, 6));
          const { calendarGrid } = renderDatePickerMenu({ value });
          userEvent.tab();
          userEvent.keyboard('{arrowup}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'August 2023');
        });

        test('down arrow updates displayed month to next', () => {
          const value = new Date(Date.UTC(2023, Month.September, 25));
          const { calendarGrid } = renderDatePickerMenu({ value });
          userEvent.tab();
          userEvent.keyboard('{arrowdown}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'October 2023');
        });

        test('does not update month when month does not need to change', () => {
          const { calendarGrid } = renderDatePickerMenu({ value: testValue });
          userEvent.tab();
          userEvent.keyboard('{arrowleft}{arrowright}{arrowup}{arrowdown}');
          expect(calendarGrid).toHaveAttribute('aria-label', 'September 2023');
        });
      });

      describe('when month should be updated', () => {
        test('left arrow focuses the previous day', () => {
          const value = new Date(Date.UTC(2023, Month.September, 1));
          const { getCellWithValue } = renderDatePickerMenu({ value });
          userEvent.tab();
          userEvent.keyboard('{arrowleft}');
          const highlightedCell = getCellWithValue(subDays(value, 1));
          expect(highlightedCell).toHaveFocus();
        });
        test('right arrow focuses the next day', () => {
          const value = new Date(Date.UTC(2023, Month.September, 30));
          const { getCellWithValue } = renderDatePickerMenu({ value });
          userEvent.tab();
          userEvent.keyboard('{arrowright}');
          const highlightedCell = getCellWithValue(addDays(value, 1));
          expect(highlightedCell).toHaveFocus();
        });
        test('up arrow focuses the previous week', () => {
          const value = new Date(Date.UTC(2023, Month.September, 6));
          const { getCellWithValue } = renderDatePickerMenu({ value });
          userEvent.tab();
          userEvent.keyboard('{arrowup}');
          const highlightedCell = getCellWithValue(subDays(value, 7));
          expect(highlightedCell).toHaveFocus();
        });
        test('down arrow focuses the next week', () => {
          const value = new Date(Date.UTC(2023, Month.September, 25));
          const { getCellWithValue } = renderDatePickerMenu({ value });
          userEvent.tab();
          userEvent.keyboard('{arrowdown}');
          const highlightedCell = getCellWithValue(addDays(value, 7));
          expect(highlightedCell).toHaveFocus();
        });
      });
    });
  });
});
