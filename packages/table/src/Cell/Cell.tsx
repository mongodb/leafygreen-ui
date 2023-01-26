import React, { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import { CellProps } from './Cell.types';
import InternalCellBase from './InternalCellBase';
import InternalCellWithRT from './InternalCellWithRT';

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
      <InternalCellBase {...rest} />
    );
  }
};

Cell.propTypes = {
  cell: PropTypes.any,
};

export default Cell;
