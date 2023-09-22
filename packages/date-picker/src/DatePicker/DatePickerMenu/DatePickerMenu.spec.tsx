import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Month } from '../../constants';
import { setUTCDate } from '../../utils/setUTCDate';
import { setUTCMonth } from '../../utils/setUTCMonth';

import { DatePickerMenu, DatePickerMenuProps } from '.';

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

    test('rendering with a value highlights that cell', () => {
      const value = new Date(Date.UTC(2023, Month.September, 14));
      const { calendarCells } = renderDatePickerMenu({
        value,
      });
      const valueCell = calendarCells.find(
        cell => cell.getAttribute('aria-label') === value.toDateString(),
      );

      expect(valueCell!).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Keyboard navigation', () => {
    const value = new Date(Date.UTC(2023, Month.September, 14));

    test.todo('default highlight is on value | today');

    test('left arrow decrements the day by 1', async () => {
      const { calendarGrid } = renderDatePickerMenu({
        value,
      });
      userEvent.type(calendarGrid, '{arrowleft}');

      const prevDay = calendarGrid.querySelector(
        `[data-iso="${setUTCDate(value, 13).toISOString()}"]`,
      );
      expect(prevDay).toHaveFocus();
    });

    test('right arrow increments the day by 1', () => {
      const { calendarGrid } = renderDatePickerMenu({
        value,
      });
      userEvent.type(calendarGrid, '{arrowright}');

      const nextDay = calendarGrid.querySelector(
        `[data-iso="${setUTCDate(value, 15).toISOString()}"]`,
      );
      expect(nextDay).toHaveFocus();
    });

    test('up arrow decrements the week by 1', () => {
      const { calendarGrid } = renderDatePickerMenu({
        value,
      });
      userEvent.type(calendarGrid, '{arrowup}');

      const prevWeek = calendarGrid.querySelector(
        `[data-iso="${setUTCDate(value, 7).toISOString()}"]`,
      );
      expect(prevWeek).toHaveFocus();
    });

    test('down arrow decrements the week by 1', () => {
      const { calendarGrid } = renderDatePickerMenu({
        value,
      });
      userEvent.type(calendarGrid, '{arrowdown}');

      const nextWeek = calendarGrid.querySelector(
        `[data-iso="${setUTCDate(value, 21).toISOString()}"]`,
      );
      expect(nextWeek).toHaveFocus();
    });

    test('left arrow changes the displayed month if necessary', () => {
      const value = new Date(Date.UTC(2023, Month.September, 1));
      const { calendarGrid } = renderDatePickerMenu({ value });
      userEvent.type(calendarGrid, '{arrowleft}');

      const prevDay = calendarGrid.querySelector(
        `[data-iso="${setUTCDate(
          setUTCMonth(value, Month.August),
          31,
        ).toISOString()}"]`,
      );
      expect(prevDay).toHaveFocus();
      expect(calendarGrid).toHaveAttribute('aria-label', 'August 2023');
    });

    test('right arrow changes the displayed month if necessary', () => {
      const value = new Date(Date.UTC(2023, Month.September, 30));
      const { calendarGrid } = renderDatePickerMenu({ value });
      userEvent.type(calendarGrid, '{arrowright}');
      const nextDay = calendarGrid.querySelector(
        `[data-iso="${setUTCDate(
          setUTCMonth(value, Month.October),
          1,
        ).toISOString()}"]`,
      );
      expect(nextDay).toHaveFocus();
      expect(calendarGrid).toHaveAttribute('aria-label', 'October 2023');
    });

    test('up arrow changes the displayed month if necessary', () => {
      const value = new Date(Date.UTC(2023, Month.September, 6));
      const { calendarGrid } = renderDatePickerMenu({ value });
      userEvent.type(calendarGrid, '{arrowup}');
      const prevWeek = calendarGrid.querySelector(
        `[data-iso="${setUTCDate(
          setUTCMonth(value, Month.August),
          30,
        ).toISOString()}"]`,
      );
      expect(prevWeek).toHaveFocus();
      expect(calendarGrid).toHaveAttribute('aria-label', 'August 2023');
    });

    test('down arrow changes the displayed month if necessary', () => {
      const value = new Date(Date.UTC(2023, Month.September, 25));
      const { calendarGrid } = renderDatePickerMenu({ value });
      userEvent.type(calendarGrid, '{arrowdown}');
      const nextWeek = calendarGrid.querySelector(
        `[data-iso="${setUTCDate(
          setUTCMonth(value, Month.October),
          2,
        ).toISOString()}"]`,
      );
      expect(nextWeek).toHaveFocus();
      expect(calendarGrid).toHaveAttribute('aria-label', 'October 2023');
    });
  });
});
