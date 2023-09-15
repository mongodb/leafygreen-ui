import React from 'react';
import { render } from '@testing-library/react';

import { Month } from '../../constants';

import { DatePickerMenu } from '.';

const renderDatePickerMenu = () => {
  return render(
    <DatePickerMenu
      usePortal
      isOpen
      value={null}
      month={new Date(Date.UTC(2023, Month.September, 1))}
      onMonthChange={() => {}}
      onCellClick={() => {}}
    />,
  );
};

describe('packages/date-picker/date-picker-menu', () => {
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
