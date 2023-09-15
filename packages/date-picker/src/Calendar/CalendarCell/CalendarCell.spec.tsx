import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalendarCell } from '.';

describe('packages/date-picker/calendar-cell', () => {
  test('has `gridcell` role', () => {
    const { container, queryByRole } = render(<CalendarCell />);
    const gridcell = queryByRole('gridcell');
    expect(gridcell).toBeInTheDocument();
    expect(container.firstChild).toEqual(gridcell);
  });

  // TODO: need to pass in the Date object to the cell
  test.todo('has appropriate `aria-label`');

  test('receives click handlers', () => {
    const clickHandler = jest.fn();
    const { queryByRole } = render(<CalendarCell onClick={clickHandler} />);
    const gridcell = queryByRole('gridcell');
    userEvent.click(gridcell!);
    expect(clickHandler).toHaveBeenCalled();
  });
});
