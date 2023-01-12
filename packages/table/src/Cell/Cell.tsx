import React, { PropsWithChildren } from 'react';
import InternalCellBase from './InternalCellBase';
import InternalCellWithRT from './InternalCellWithRT';
import { CellProps } from './Cell.types';

const Cell = <T extends unknown>({
  cell,
  ...rest
}: PropsWithChildren<CellProps<T>>) => {
  const usesRT = !!cell;

  if (usesRT) {
    return (
      // missing cellIndex prop will be provided by cloneElement call from Row
      // @ts-expect-error
      <InternalCellWithRT cell={cell} {...rest} />
    );
  } else {
    return (
      // missing cellIndex prop will be provided by cloneElement call from Row
      // @ts-expect-error
      <InternalCellBase
        {...rest}
      />
    );
  }
};

export default Cell;
