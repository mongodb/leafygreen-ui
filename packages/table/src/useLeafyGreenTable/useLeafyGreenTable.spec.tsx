import React from 'react';

import { act, renderHook } from '@leafygreen-ui/testing-lib';

import { Person } from '../utils/makeData.testutils';
import {
  getDefaultTestColumns,
  getDefaultTestData,
} from '../utils/testHookCalls.testutils';

import useLeafyGreenTable from './useLeafyGreenTable';
import { LeafyGreenTableRow } from './useLeafyGreenTable.types';

describe('packages/table/useLeafyGreenTable', () => {
  test('returns a table object', () => {
    const { result } = renderHook(() =>
      useLeafyGreenTable({
        columns: [],
        data: [],
      }),
    );
    expect(typeof result.current).toBe('object');
  });

  test('returns the correct number of rows', () => {
    const data = getDefaultTestData({});

    const { result } = renderHook(() =>
      useLeafyGreenTable({
        data,
        columns: getDefaultTestColumns({}),
      }),
    );
    expect(result.current.getRowModel().rows.length).toEqual(data.length);
  });

  test('returns the correct number of rows with expandedContent', () => {
    const data = getDefaultTestData({
      renderExpandedContent: (_: LeafyGreenTableRow<Person>) => {
        return <>Expandable content test</>;
      },
    });

    const { result } = renderHook(() =>
      useLeafyGreenTable({
        data,
        columns: getDefaultTestColumns({}),
      }),
    );

    expect(result.current.getRowModel().rows.length).toEqual(data.length);
  });

  test('returns the correct number of rows with subRows', () => {
    const data = getDefaultTestData({
      subRows: getDefaultTestData({}),
    });

    const { result } = renderHook(() =>
      useLeafyGreenTable({
        data,
        columns: getDefaultTestColumns({}),
      }),
    );

    // Subrows are only included if they are expanded
    expect(result.current.getRowModel().rows.length).toEqual(data.length);
  });

  test('returns the correct number of rows when a row is expanded and an empty state is passed', () => {
    const data = getDefaultTestData({
      renderExpandedContent: (_: LeafyGreenTableRow<Person>) => {
        return <>Expandable content test</>;
      },
    });

    const { result } = renderHook(() =>
      useLeafyGreenTable({
        data,
        columns: getDefaultTestColumns({}),
        // This empty state should not affect the default behavior
        state: {},
      }),
    );

    const [firstRow] = result.current.getExpandedRowModel().rows;
    expect(result.current.getRowCount()).toEqual(data.length);

    // Expand the first row and expect a new row to appear
    act(() => {
      firstRow.toggleExpanded();
    });
    expect(result.current.getRowCount()).toEqual(data.length + 1);
  });

  test('returns the correct number of rows with initialState set by consumer', () => {
    const data = getDefaultTestData({
      subRows: getDefaultTestData({}),
    });

    const { result } = renderHook(() =>
      useLeafyGreenTable({
        data,
        columns: getDefaultTestColumns({}),
        initialState: {
          expanded: Object.fromEntries(data.map((_dataObj, i) => [i, i === 0])),
        },
      }),
    );

    // Subrows of the first row should be included in the count due to initialState
    expect(result.current.getRowCount()).toEqual(
      data.length + (data[0]?.subRows?.length ?? 0),
    );
  });

  describe('shouldMemoizeRows logic', () => {
    it('should return true on initial load', () => {
      const { result } = renderHook(() => {
        const columns = getDefaultTestColumns({});
        return useLeafyGreenTable({
          data: getDefaultTestData({}),
          columns,
        });
      });

      expect(result.current.shouldMemoizeRows).toBe(true);
    });

    it('should return true when columns are unchanged', () => {
      const columns = getDefaultTestColumns({});

      const { result, rerender } = renderHook(
        ({ cols }) =>
          useLeafyGreenTable({
            data: getDefaultTestData({}),
            columns: cols,
          }),
        { initialProps: { cols: columns } },
      );

      expect(result.current.shouldMemoizeRows).toBe(true);

      // Re-render with same columns
      rerender({ cols: columns });

      expect(result.current.shouldMemoizeRows).toBe(true);
    });

    it('should return false when columns change', () => {
      const initialColumns = getDefaultTestColumns({});
      const changedColumns = [
        ...initialColumns,
        { accessorKey: 'newField', header: 'New Field' },
      ];

      const { result, rerender } = renderHook(
        ({ cols }) =>
          useLeafyGreenTable({
            data: getDefaultTestData({}),
            columns: cols,
          }),
        { initialProps: { cols: initialColumns } },
      );

      expect(result.current.shouldMemoizeRows).toBe(true);

      // Change columns
      rerender({ cols: changedColumns });

      expect(result.current.shouldMemoizeRows).toBe(false);
    });

    it('should return false when cell renderer changes in existing column', () => {
      const initialColumns = getDefaultTestColumns({});

      // Create modified columns where we change the cell renderer for firstName column
      const changedColumns = initialColumns.map(col => {
        // @ts-expect-error: accessorKey may not exist on all ColumnDef types
        if (col.accessorKey === 'firstName') {
          return {
            ...col,
            cell: (info: any) => <strong>Bold: {info.getValue()}</strong>, // Changed from simple info.getValue()
          };
        }

        return col;
      });

      const { result, rerender } = renderHook(
        ({ cols }) =>
          useLeafyGreenTable({
            data: getDefaultTestData({}),
            columns: cols,
          }),
        { initialProps: { cols: initialColumns } },
      );

      expect(result.current.shouldMemoizeRows).toBe(true);

      // Change the cell renderer for firstName column
      rerender({ cols: changedColumns });

      expect(result.current.shouldMemoizeRows).toBe(false);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('Typescript', () => {
    // @ts-expect-error - requires columns, data
    useLeafyGreenTable({});

    // columns, data are necessary & sufficient options
    useLeafyGreenTable({
      columns: [],
      data: [],
    });
  });
});
