import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { renderTable } from './testUtils';

describe('packages/table/cell', () => {
  test('it renders a "td" tag', () => {
    renderTable();
    const cell = screen.getAllByRole('cell');
    expect(cell[0].tagName.toLowerCase()).toBe('td');
  });

  test('it renders a "th" tag when passing a truthy value to isHeader', () => {
    renderTable();
    const header = screen.getAllByRole('rowheader');
    expect(header[0].tagName.toLowerCase()).toBe('th');
  });

  test('it renders its children as its contents', () => {
    renderTable();
    const cell = screen.getAllByRole('rowheader');
    expect(cell[0].innerHTML).toContain('Alice');
  });
});
