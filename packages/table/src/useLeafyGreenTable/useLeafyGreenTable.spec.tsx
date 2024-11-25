import React from 'react';

import { renderHook } from '@leafygreen-ui/testing-lib';

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
    const { result } = renderHook(() =>
      useLeafyGreenTable({
        data: getDefaultTestData({}),
        columns: getDefaultTestColumns({}),
      }),
    );
    expect(result.current.getRowModel().rows.length).toEqual(3);
  });

  test('returns the correct number of rows with expandedContent', () => {
    const { result } = renderHook(() =>
      useLeafyGreenTable({
        data: getDefaultTestData({
          // eslint-disable-next-line react/display-name
          renderExpandedContent: (_: LeafyGreenTableRow<Person>) => {
            return <>Expandable content test</>;
          },
        }),
        columns: getDefaultTestColumns({}),
      }),
    );
    expect(result.current.getRowModel().rows.length).toEqual(3);
  });

  test('returns the correct number of rows with subRows', () => {
    const { result } = renderHook(() =>
      useLeafyGreenTable({
        data: getDefaultTestData({
          subRows: getDefaultTestData({}),
        }),
        columns: getDefaultTestColumns({}),
      }),
    );
    expect(result.current.getRowModel().rows.length).toEqual(3);
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
