import React from 'react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import useLeafyGreenVirtualTable from './useLeafyGreenVirtualTable';

describe('packages/table/useLeafyGreenVirtualTable', () => {
  test('returns a table object', () => {
    const { result } = renderHook(() =>
      useLeafyGreenVirtualTable({
        containerRef: React.createRef<HTMLDivElement>(),
        columns: [],
        data: [],
      }),
    );
    expect(typeof result.current).toBe('object');
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('Typescript', () => {
    // @ts-expect-error - requires columns, data, containerReff
    useLeafyGreenVirtualTable({});

    // @ts-expect-error - requires containerRef
    useLeafyGreenVirtualTable({
      columns: [],
      data: [],
    });

    // containerRef, columns, data are necessary & sufficient options
    useLeafyGreenVirtualTable({
      containerRef: React.createRef<HTMLDivElement>(),
      columns: [],
      data: [],
    });

    useLeafyGreenVirtualTable({
      containerRef: React.createRef<HTMLDivElement>(),
      columns: [],
      data: [],
      virtualizerOptions: {},
    });
  });
});
