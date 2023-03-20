import { screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { normalizeAccessor } from './TableHeader';
import { renderTable } from './testUtils';

describe('packages/table/table-header', () => {
  describe('the normalizeAccessor function works as expected', () => {
    test('it accesses the data correctly when passed a string', () => {
      const normalizedAccessor = normalizeAccessor('test');

      // @ts-expect-error
      const _: 'bye' = normalizedAccessor({ test: 'hi' } as const);

      const hi: 'hi' = normalizedAccessor({ test: 'hi' } as const);

      expect(hi).toBe('hi');
    });
    test('it accesses the data correctly when passed a function', () => {
      const normalizedAccessor = normalizeAccessor(
        <T,>(data: { test: T }) => data.test,
      );

      // @ts-expect-error
      const _: 'bye' = normalizedAccessor({ test: 'hi' } as const);

      const hi: 'hi' = normalizedAccessor({ test: 'hi' } as const);

      expect(hi).toBe('hi');
    });
  });

  test('it renders "label" as content inside of "th" tags', () => {
    renderTable();
    const tableHeaderRow = Array.from(screen.getAllByRole('row')[0].children);
    const firstColumn = tableHeaderRow[0];
    expect(firstColumn.tagName.toLowerCase()).toBe('th');
    expect(firstColumn.innerHTML).toContain('Name');
  });
});
