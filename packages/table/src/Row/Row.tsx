import React, { ForwardedRef } from 'react';
import PropTypes from 'prop-types';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useTableContext, useVirtualTableContext } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';

import InternalRowWithoutRT from './InternalRowWithoutRT';
import { MemoizedInternalRowWithRT } from './InternalRowWithRT';
import { RowComponentType, RowProps } from './Row.types';
import { RowContextProvider } from './RowContext';

/**
 * Renders the provided cells
 */

const RowWithRef = <T extends LGRowData>(
  { row, virtualRow, disabled = false, ...rest }: RowProps<T>,
  ref: ForwardedRef<HTMLTableRowElement>,
) => {
  const { theme } = useDarkMode();
  const { shouldAlternateRowColor = false } = useTableContext();
  const { virtualTable } = useVirtualTableContext();
  return (
    <>
      {row ? (
        <MemoizedInternalRowWithRT
          row={row}
          virtualRow={virtualRow}
          theme={theme}
          measureElement={virtualTable?.measureElement}
          shouldAlternateRowColor={shouldAlternateRowColor}
          isExpanded={row.getIsExpanded()}
          isParentExpanded={
            (row.getParentRow() && row.getParentRow()?.getIsExpanded()) ?? false
          }
          isSelected={row.getIsSelected()}
          ref={ref}
          {...rest}
        />
      ) : (
        <RowContextProvider disabled={disabled}>
          <InternalRowWithoutRT ref={ref} {...rest} />
        </RowContextProvider>
      )}
    </>
  );
};

// TODO: Can i avoid asserting?
export const Row = React.forwardRef(RowWithRef) as RowComponentType;

Row.propTypes = {
  virtualRow: PropTypes.any,
  row: PropTypes.any,
  disabled: PropTypes.bool,
};

Row.displayName = 'Row';

export default Row;
