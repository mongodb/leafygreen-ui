import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalendarCell, CalendarCellState } from '.';

const TestCellWrapper = ({ children }: PropsWithChildren) => (
  <table>
    <tbody>
      <tr data-testid="tr">{children}</tr>
    </tbody>
  </table>
);

describe('packages/date-picker/calendar-cell', () => {
  test('has `gridcell` role', () => {
    const { queryByRole, getByTestId } = render(
      <TestCellWrapper>
        <CalendarCell aria-label="" />
      </TestCellWrapper>,
    );
    const gridcell = queryByRole('gridcell');
    expect(gridcell).toBeInTheDocument();
    expect(getByTestId('tr').firstChild).toEqual(gridcell);
  });

  test('renders as aria-disabled', () => {
    const clickHandler = jest.fn();
    const { queryByRole } = render(
      <TestCellWrapper>
        <CalendarCell
          aria-label=""
          onClick={clickHandler}
          state={CalendarCellState.Disabled}
        />
      </TestCellWrapper>,
    );
    const gridcell = queryByRole('gridcell');
    expect(gridcell).toHaveAttribute('aria-disabled', 'true');
  });

  test('receives click handlers', () => {
    const clickHandler = jest.fn();
    const { queryByRole } = render(
      <TestCellWrapper>
        <CalendarCell aria-label="" onClick={clickHandler} />
      </TestCellWrapper>,
    );
    const gridcell = queryByRole('gridcell');
    userEvent.click(gridcell!);
    expect(clickHandler).toHaveBeenCalled();
  });

  test('Does not fire click handler when disabled', () => {
    const clickHandler = jest.fn();
    const { queryByRole } = render(
      <TestCellWrapper>
        <CalendarCell
          aria-label=""
          onClick={clickHandler}
          state={CalendarCellState.Disabled}
        />
      </TestCellWrapper>,
    );
    const gridcell = queryByRole('gridcell');
    userEvent.click(gridcell!);
    expect(clickHandler).not.toHaveBeenCalled();
  });
});
