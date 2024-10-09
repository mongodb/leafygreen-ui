import React from 'react';
import PropTypes from 'prop-types';

import { LGRowData } from '../useLeafyGreenTable';

import InternalRowWithoutRT from './InternalRowWithoutRT';
import InternalRowWithRT from './InternalRowWithRT';
import { RowProps } from './Row.types';

/**
 * Renders the provided cells
 */
const Row = <T extends LGRowData>({
  row,
  virtualRow,
  ...rest
}: RowProps<T>) => {
  return (
    <>
      {row ? (
        <InternalRowWithRT row={row} virtualRow={virtualRow} {...rest} />
      ) : (
        <InternalRowWithoutRT {...rest} />
      )}
    </>
  );
};

Row.propTypes = {
  virtualRow: PropTypes.any,
  row: PropTypes.any,
  disabled: PropTypes.bool,
};

Row.displayName = 'Row';

export default Row;
