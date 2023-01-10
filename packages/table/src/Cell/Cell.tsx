import React, { PropsWithChildren } from 'react';
import InternalCellWithoutVS from './InternalCellWithoutVS';
import InternalCellWithVS from './InternalCellWithVS';
import { CellProps } from './types';

const Cell = <T extends unknown>({
  cell,
  toggleExpandedIconProps,
  ...rest
}: PropsWithChildren<CellProps<T>>) => {
  const hasVS = !!cell;

  if (hasVS) {
    return (
      // missing props will be provided by cloneElement call from Row
      <InternalCellWithVS
        cell={cell}
        {...rest}
      />
    );
  } else {
    return (
      // missing props will be provided by cloneElement call from Row
      <InternalCellWithoutVS
        toggleExpandedIconProps={toggleExpandedIconProps}
        {...rest}
      />
    );
  }
};

export default Cell;
