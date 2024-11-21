import React from 'react';

import useLeafyGreenTable from './useLeafyGreenTable';

describe('packages/table/useLeafyGreenTable', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('Typescript', () => {
    // @ts-expect-error - requires columns, data
    useLeafyGreenTable({});

    // containerRef, columns, data are necessary & sufficient options
    useLeafyGreenTable({
      columns: [],
      data: [],
    });
  });
});
