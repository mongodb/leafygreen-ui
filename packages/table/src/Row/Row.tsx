import React, { ForwardedRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { LGRowData } from '../useLeafyGreenTable';

import InternalRowWithoutRT from './InternalRowWithoutRT';
import InternalRowWithRT from './InternalRowWithRT';
import { RowProps } from './Row.types';

/**
 * Renders the provided cells
 */
const Row = forwardRef(
  <T extends LGRowData>(
    { row, virtualRow, ...rest }: RowProps<T>,
    fwdRef: ForwardedRef<HTMLTableRowElement>,
  ) => {
    return (
      <>
        {row ? (
          <InternalRowWithRT
            ref={fwdRef}
            //@ts-ignore - FIXME: incompatible type 😭
            row={row}
            virtualRow={virtualRow}
            {...rest}
          />
        ) : (
          <InternalRowWithoutRT {...rest} />
        )}
      </>
    );
  },
);

Row.propTypes = {
  virtualRow: PropTypes.any,
  row: PropTypes.any,
  disabled: PropTypes.bool,
};

Row.displayName = 'Row';

export default Row;
