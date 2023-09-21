import React from 'react';
import PropTypes from 'prop-types';

import { LGRowData } from '../useLeafyGreenTable';

import InternalRowWithoutRT from './InternalRowWithoutRT';
import InternalRowWithRT from './InternalRowWithRT';
import { RowProps } from './Row.types';
import { RowContextProvider } from './RowContext';

/**
 * Renders the provided cells
 */
const Row = <T extends LGRowData>({
  row,
  virtualRow,
  disabled,
  ...rest
}: RowProps<T>) => {
  return (
    <RowContextProvider disabled={disabled}>
      {row ? (
        <InternalRowWithRT row={row} virtualRow={virtualRow} {...rest} />
      ) : (
        <InternalRowWithoutRT {...rest} />
      )}
    </RowContextProvider>
  );
};

Row.propTypes = {
  virtualRow: PropTypes.any,
  row: PropTypes.any,
  disabled: PropTypes.bool,
};

Row.displayName = 'Row';

export default Row;
