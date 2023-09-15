import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalendarCell, CalendarCellState } from '.';

describe('packages/date-picker/calendar-cell', () => {
  test('has `gridcell` role', () => {
    const { container, queryByRole } = render(<CalendarCell aria-label="" />);
    const gridcell = queryByRole('gridcell');
    expect(gridcell).toBeInTheDocument();
    expect(container.firstChild).toEqual(gridcell);
  });

  // TODO: need to pass in the Date object to the cell
  test.todo('has appropriate `aria-label`');

  test('renders as aria-disabled', () => {
    const clickHandler = jest.fn();
    const { queryByRole } = render(
      <CalendarCell
        aria-label=""
        onClick={clickHandler}
        state={CalendarCellState.Disabled}
      />,
    );
    const gridcell = queryByRole('gridcell');
    expect(gridcell).toHaveAttribute('aria-disabled', 'true');
  });

  test('receives click handlers', () => {
    const clickHandler = jest.fn();
    const { queryByRole } = render(
      <CalendarCell aria-label="" onClick={clickHandler} />,
    );
    const gridcell = queryByRole('gridcell');
    userEvent.click(gridcell!);
    expect(clickHandler).toHaveBeenCalled();
  });

  test('Does not fire click handler when disabled', () => {
    const clickHandler = jest.fn();
    const { queryByRole } = render(
      <CalendarCell
        aria-label=""
        onClick={clickHandler}
        state={CalendarCellState.Disabled}
      />,
    );
    const gridcell = queryByRole('gridcell');
    userEvent.click(gridcell!);
    expect(clickHandler).not.toHaveBeenCalled();
  });
});
