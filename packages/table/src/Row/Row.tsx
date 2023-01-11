import React, { PropsWithChildren } from 'react';
import { LeafygreenTableRowData } from '../useLeafygreenTable/useLeafygreenTable';
import InternalRowWithoutVS from './InternalRowWithoutVS';
import InternalRowWithRT from './InternalRowWithRT';
import { RowProps } from './types';

type RowData<T> = T extends LeafygreenTableRowData<T> ? T : LeafygreenTableRowData<T>;

const Row = <T extends unknown>({
  row,
  virtualRow,
  ...rest
}: PropsWithChildren<RowProps<RowData<T>>>) => {

  if (!!row) {
    return (
      <InternalRowWithRT
        row={row}
        virtualRow={virtualRow}
        {...rest}
      />
    );
  } else {
    return (
      <InternalRowWithoutVS
        {...rest}
      />
    );
  }
};

export default Row;
