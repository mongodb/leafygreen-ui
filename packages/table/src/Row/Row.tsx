import React, { PropsWithChildren } from 'react';
import { LeafygreenTableType } from '../useLeafygreenTable';
import InternalRowWithoutRT from './InternalRowWithoutRT';
import InternalRowWithRT from './InternalRowWithRT';
import { RowProps } from './Row.types';

const Row = <T extends unknown>({
  row,
  virtualRow,
  ...rest
}: RowProps<T>) => {
  if (row) {
    return <InternalRowWithRT row={row} virtualRow={virtualRow} {...rest} />;
  } else {
    return <InternalRowWithoutRT {...rest} />;
  }
};

export default Row;
