import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month } from '../../constants';
import { setUTCDate } from '../../utils/setUTCDate';

import { DatePickerMenu, DatePickerMenuProps } from '.';

const today = new Date(Date.UTC(2023, Month.September, 10));

const renderDatePickerMenu = (props?: Partial<DatePickerMenuProps>) => {
  const result = render(
    <DatePickerMenu
      isOpen
      value={null}
      month={new Date(Date.UTC(2023, Month.September, 1))}
      onMonthChange={() => {}}
      onCellClick={() => {}}
      {...props}
    />,
  );
  const calendarGrid = result.getByRole('grid');

  const calendarCells = result.queryAllByRole(
    'gridcell',
  ) as Array<HTMLTableCellElement>;

  return {
    ...result,
    calendarGrid,
    calendarCells,
  };
};

describe('packages/date-picker/date-picker-menu', () => {
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
  });

  describe('Keyboard navigation', () => {
    const value = new Date(Date.UTC(2023, Month.September, 14));

    beforeEach(() => {
      // Set the current time to midnight UTC on 2023-09-10
      jest.useFakeTimers().setSystemTime(today);
    });

    test('default highlight is on today', () => {
      const { calendarGrid } = renderDatePickerMenu();
      userEvent.tab();
      const todayCell = calendarGrid.querySelector(
        `[data-iso="${today.toISOString()}"]`,
      );
      expect(todayCell).toHaveFocus();
    });

    test('highlight starts on on current value when provided', () => {
      const { calendarGrid } = renderDatePickerMenu({
        value,
      });
      userEvent.tab();
      const valueCell = calendarGrid.querySelector(
        `[data-iso="${value.toISOString()}"]`,
      );
      expect(valueCell).toHaveFocus();
    });

    test('left arrow decrements the day by 1', async () => {
      const { calendarGrid } = renderDatePickerMenu({
        value,
      });
      userEvent.tab();
      userEvent.keyboard('{arrowleft}');

      const prevDay = calendarGrid.querySelector(
        `[data-iso="${setUTCDate(value, 13).toISOString()}"]`,
      );
      expect(prevDay).toHaveFocus();
    });

    test('right arrow increments the day by 1', () => {
      const { calendarGrid } = renderDatePickerMenu({
        value,
      });
      userEvent.tab();
      userEvent.keyboard('{arrowright}');
      const nextDay = calendarGrid.querySelector(
        `[data-iso="${setUTCDate(value, 15).toISOString()}"]`,
      );
      expect(nextDay).toHaveFocus();
    });

    test('up arrow decrements the week by 1', () => {
      const { calendarGrid } = renderDatePickerMenu({
        value,
      });
      userEvent.tab();
      userEvent.keyboard('{arrowup}');

      const prevWeek = calendarGrid.querySelector(
        `[data-iso="${setUTCDate(value, 7).toISOString()}"]`,
      );
      expect(prevWeek).toHaveFocus();
    });

    test('down arrow decrements the week by 1', () => {
      const { calendarGrid } = renderDatePickerMenu({
        value,
      });
      userEvent.tab();
      userEvent.keyboard('{arrowdown}');

      const nextWeek = calendarGrid.querySelector(
        `[data-iso="${setUTCDate(value, 21).toISOString()}"]`,
      );
      expect(nextWeek).toHaveFocus();
    });

    test('left arrow triggers the month change handler', () => {
      const onMonthChange = jest.fn();
      const value = new Date(Date.UTC(2023, Month.September, 1));
      renderDatePickerMenu({ value, onMonthChange });
      userEvent.tab();
      userEvent.keyboard('{arrowleft}');
      expect(onMonthChange).toHaveBeenCalled();
    });

    test('right arrow triggers the month change handler', () => {
      const onMonthChange = jest.fn();
      const value = new Date(Date.UTC(2023, Month.September, 30));
      renderDatePickerMenu({ value, onMonthChange });
      userEvent.tab();
      userEvent.keyboard('{arrowright}');
      expect(onMonthChange).toHaveBeenCalled();
    });

    test('up arrow triggers the month change handler', () => {
      const value = new Date(Date.UTC(2023, Month.September, 6));
      const onMonthChange = jest.fn();
      renderDatePickerMenu({ value, onMonthChange });
      userEvent.tab();
      userEvent.keyboard('{arrowup}');
      expect(onMonthChange).toHaveBeenCalled();
    });

    test('down arrow triggers the month change handler', async () => {
      const value = new Date(Date.UTC(2023, Month.September, 25));
      const onMonthChange = jest.fn();
      renderDatePickerMenu({ value, onMonthChange });
      userEvent.tab();
      userEvent.keyboard('{arrowdown}');
      expect(onMonthChange).toHaveBeenCalled();
    });

    test('arrow keys do not trigger month change handler all the time', () => {
      const onMonthChange = jest.fn();
      renderDatePickerMenu({ value, onMonthChange });
      userEvent.tab();
      userEvent.keyboard('{arrowleft}{arrowright}{arrowup}{arrowdown}');
      expect(onMonthChange).not.toHaveBeenCalled();
    });
  });
});
