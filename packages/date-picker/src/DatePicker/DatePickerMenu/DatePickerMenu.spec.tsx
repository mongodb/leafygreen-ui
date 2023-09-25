import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addDays } from 'date-fns';

import { Month } from '../../constants';
import {
  DatePickerProvider,
  DatePickerProviderProps,
} from '../../DatePickerContext';
import { defaultDatePickerContext } from '../../DatePickerContext/DatePickerContext.utils';
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
      <DatePickerMenu
        isOpen
        value={null}
        month={new Date(Date.UTC(2023, Month.September, 1))}
        onMonthChange={() => {}}
        onCellClick={() => {}}
        {...props}
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

  return {
    ...result,
    calendarGrid,
    calendarCells,
    todayCell,
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
    test('select menus have appropriate values', () => {
      const result = renderDatePickerMenu();
      const monthSelect = result.getByLabelText('Select month');
      const yearSelect = result.getByLabelText('Select year');
      expect(monthSelect).toHaveValue(Month.September.toString());
      expect(yearSelect).toHaveValue('2023');
    });

    describe('rendered cells', () => {
      test('have appropriate `aria-label`', () => {
        const { calendarGrid } = renderDatePickerMenu();
        const todayCell = calendarGrid.querySelector(
          `[data-iso="${testToday.toISOString()}"]`,
        );
        expect(todayCell).toHaveAttribute('aria-label', 'Sun Sep 10 2023');
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
      const { calendarGrid } = renderDatePickerMenu({
        value: testValue,
      });
      userEvent.tab();
      const valueCell = calendarGrid.querySelector(
        `[data-iso="${testValue.toISOString()}"]`,
      );
      expect(valueCell).toHaveFocus();
    });

    describe('Arrow Keys', () => {
      test('left arrow moves focus to the previous day', async () => {
        const { calendarGrid } = renderDatePickerMenu({
          value: testValue,
        });
        userEvent.tab();
        userEvent.keyboard('{arrowleft}');

        const prevDay = calendarGrid.querySelector(
          `[data-iso="${setUTCDate(testValue, 13).toISOString()}"]`,
        );
        expect(prevDay).toHaveFocus();
      });

      test('right arrow moves focus to the next day', () => {
        const { calendarGrid } = renderDatePickerMenu({
          value: testValue,
        });
        userEvent.tab();
        userEvent.keyboard('{arrowright}');
        const nextDay = calendarGrid.querySelector(
          `[data-iso="${setUTCDate(testValue, 15).toISOString()}"]`,
        );
        expect(nextDay).toHaveFocus();
      });

      test('up arrow moves focus to the previous week', () => {
        const { calendarGrid } = renderDatePickerMenu({
          value: testValue,
        });
        userEvent.tab();
        userEvent.keyboard('{arrowup}');

        const prevWeek = calendarGrid.querySelector(
          `[data-iso="${setUTCDate(testValue, 7).toISOString()}"]`,
        );
        expect(prevWeek).toHaveFocus();
      });

      test('down arrow moves focus to the next week', () => {
        const { calendarGrid } = renderDatePickerMenu({
          value: testValue,
        });
        userEvent.tab();
        userEvent.keyboard('{arrowdown}');

        const nextWeek = calendarGrid.querySelector(
          `[data-iso="${setUTCDate(testValue, 21).toISOString()}"]`,
        );
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

      describe('call the month change handler', () => {
        test('left arrow triggers handler', () => {
          const onMonthChange = jest.fn();
          const value = new Date(Date.UTC(2023, Month.September, 1));
          renderDatePickerMenu({ value, onMonthChange });
          userEvent.tab();
          userEvent.keyboard('{arrowleft}');
          expect(onMonthChange).toHaveBeenCalled();
        });

        test('right arrow triggers handler', () => {
          const onMonthChange = jest.fn();
          const value = new Date(Date.UTC(2023, Month.September, 30));
          renderDatePickerMenu({ value, onMonthChange });
          userEvent.tab();
          userEvent.keyboard('{arrowright}');
          expect(onMonthChange).toHaveBeenCalled();
        });

        test('up arrow triggers handler', () => {
          const value = new Date(Date.UTC(2023, Month.September, 6));
          const onMonthChange = jest.fn();
          renderDatePickerMenu({ value, onMonthChange });
          userEvent.tab();
          userEvent.keyboard('{arrowup}');
          expect(onMonthChange).toHaveBeenCalled();
        });

        test('down arrow triggers handler', async () => {
          const value = new Date(Date.UTC(2023, Month.September, 25));
          const onMonthChange = jest.fn();
          renderDatePickerMenu({ value, onMonthChange });
          userEvent.tab();
          userEvent.keyboard('{arrowdown}');
          expect(onMonthChange).toHaveBeenCalled();
        });

        test('does not trigger handler when month does not need to change', () => {
          const onMonthChange = jest.fn();
          renderDatePickerMenu({ value: testValue, onMonthChange });
          userEvent.tab();
          userEvent.keyboard('{arrowleft}{arrowright}{arrowup}{arrowdown}');
          expect(onMonthChange).not.toHaveBeenCalled();
        });
      });

      describe('when month is updated', () => {
        test.todo('left arrow focuses the correct day');
        test.todo('right arrow focuses the correct day');
        test.todo('up arrow focuses the correct day');
        test.todo('down arrow focuses the correct day');
      });
    });
  });
});
