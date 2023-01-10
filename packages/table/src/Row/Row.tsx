import React, { PropsWithChildren } from 'react';
import { LeafygreenTableRowData } from '../useLeafygreenTable/useLeafygreenTable';
import InternalRowWithoutVS from './InternalRowWithoutVS';
import InternalRowWithVS from './InternalRowWithVS';
import { RowProps } from './types';

type RowData<T> = T extends LeafygreenTableRowData<T> ? T : LeafygreenTableRowData<T>;

const Row = <T extends unknown>({
  row,
  virtualRow,
  ...rest
}: PropsWithChildren<RowProps<RowData<T>>>) => {
  const hasVS = !!row;

  if (hasVS && virtualRow) {
    return (
      <InternalRowWithVS
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
