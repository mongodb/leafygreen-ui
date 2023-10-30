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

describe('packages/date-picker/shared/calendar-cell', () => {
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

  test('triggers click handler on click', () => {
    const clickHandler = jest.fn();
    const { queryByRole } = render(
      <TestCellWrapper>
        <CalendarCell aria-label="" onClick={clickHandler} />
      </TestCellWrapper>,
    );
    const gridcell = queryByRole('gridcell');
    userEvent.click(gridcell!, {}, { skipPointerEventsCheck: true });
    expect(clickHandler).toHaveBeenCalled();
  });

  test('triggers click handler on enter', () => {
    const clickHandler = jest.fn();
    const { queryByRole } = render(
      <TestCellWrapper>
        <CalendarCell aria-label="" onClick={clickHandler} />
      </TestCellWrapper>,
    );
    const gridcell = queryByRole('gridcell');
    gridcell!.focus();
    userEvent.keyboard('[Enter]');
    expect(clickHandler).toHaveBeenCalled();
  });

  test('triggers click handler on space', () => {
    const clickHandler = jest.fn();
    const { queryByRole } = render(
      <TestCellWrapper>
        <CalendarCell aria-label="" onClick={clickHandler} />
      </TestCellWrapper>,
    );
    const gridcell = queryByRole('gridcell');
    gridcell!.focus();
    userEvent.keyboard('{space}');
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
    userEvent.click(gridcell!, {}, { skipPointerEventsCheck: true });
    expect(clickHandler).not.toHaveBeenCalled();
  });

  test('is focusable when highlighted', () => {
    const { queryByRole } = render(
      <TestCellWrapper>
        <CalendarCell aria-label="" isHighlighted />
      </TestCellWrapper>,
    );
    const gridcell = queryByRole('gridcell');
    userEvent.click(gridcell!, {}, { skipPointerEventsCheck: true });
    expect(gridcell).toHaveFocus();
  });

  test('is not focusable when disabled', () => {
    const { queryByRole } = render(
      <TestCellWrapper>
        <CalendarCell aria-label="" state={CalendarCellState.Disabled} />
      </TestCellWrapper>,
    );
    const gridcell = queryByRole('gridcell');
    userEvent.click(gridcell!, {}, { skipPointerEventsCheck: true });
    expect(gridcell).not.toHaveFocus();
  });
});
