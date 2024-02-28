import React from 'react';

import useLeafyGreenTable from './useLeafyGreenTable';

describe('packages/table/useLeafyGreenTable', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('Typescript', () => {
    // @ts-expect-error - requires containerRef, columns, data
    useLeafyGreenTable({});

    // containerRef, columns, data are necessary & sufficient options
    useLeafyGreenTable({
      containerRef: React.createRef<HTMLDivElement>(),
      columns: [],
      data: [],
    });

    const necessaryOptions = {
      containerRef: React.createRef<HTMLDivElement>(),
      columns: [],
      data: [],
    };

    // @ts-expect-error - virtualizerOptions is not valid when useVirtualScrolling is false/undefined
    useLeafyGreenTable({
      ...necessaryOptions,
      virtualizerOptions: {},
    });

    // @ts-expect-error - virtualizerOptions is not valid when useVirtualScrolling is false/undefined
    useLeafyGreenTable({
      ...necessaryOptions,
      useVirtualScrolling: false,
      virtualizerOptions: {},
    });

    // virtualizerOptions is a valid prop when useVirtualScrolling is true
    useLeafyGreenTable({
      ...necessaryOptions,
      useVirtualScrolling: true,
      virtualizerOptions: {},
    });
  });
});
