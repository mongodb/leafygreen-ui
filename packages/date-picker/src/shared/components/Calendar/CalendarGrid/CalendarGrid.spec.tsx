import React from 'react';
import { render } from '@testing-library/react';

import { CalendarGrid } from '.';

describe('packages/date-picker/shared/calendar-grid', () => {
  test('has `grid` role', () => {
    const { container, queryByRole } = render(
      <CalendarGrid month={new Date()}>{() => <></>}</CalendarGrid>,
    );
    const grid = queryByRole('grid');
    expect(grid).toBeInTheDocument();
    expect(container.firstChild).toEqual(grid);
  });

  test('day name headers have `columnheader` role', () => {
    const { queryAllByRole } = render(
      <CalendarGrid month={new Date()}>{() => <></>}</CalendarGrid>,
    );
    const headerCells = queryAllByRole('columnheader');
    expect(headerCells).toHaveLength(7);
  });

  test('day name headers have `abbr` attribute', () => {
    const { queryAllByRole } = render(
      <CalendarGrid month={new Date()}>{() => <></>}</CalendarGrid>,
    );
    const headerCells = queryAllByRole('columnheader');
    headerCells.forEach(cell => {
      expect(cell).toHaveAttribute('abbr');
    });
  });
});
