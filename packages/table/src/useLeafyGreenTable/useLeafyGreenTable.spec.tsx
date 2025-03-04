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
