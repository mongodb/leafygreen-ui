import React, { PropsWithChildren } from 'react';
import { LeafygreenTableType } from '../useLeafygreenTable';
import InternalRowBase from './InternalRowBase';
import InternalRowWithRT from './InternalRowWithRT';
import { RowProps } from './types';

const Row = <T extends unknown>({
  row,
  virtualRow,
  ...rest
}: PropsWithChildren<RowProps<LeafygreenTableType<T>>>) => {
  if (row) {
    return <InternalRowWithRT row={row} virtualRow={virtualRow} {...rest} />;
  } else {
    return <InternalRowBase {...rest} />;
  }
};

export default Row;
