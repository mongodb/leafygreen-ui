import React from 'react';

import useLeafyGreenVirtualTable from './useLeafyGreenVirtualTable';

describe('packages/table/useLeafyGreenVirtualTable', () => {
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
