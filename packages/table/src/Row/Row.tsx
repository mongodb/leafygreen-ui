import React, { ForwardedRef } from 'react';
import PropTypes from 'prop-types';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useTableContext } from '../TableContext';
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
  const { shouldAlternateRowColor = false, virtualTable } = useTableContext();

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

// React.forwardRef can only work with plain function types, i.e. types with a single call signature and no other members.
// This assertion has an interface that restores the original function signature to work with generics.
export const Row = React.forwardRef(RowWithRef) as RowComponentType;

Row.propTypes = {
  virtualRow: PropTypes.any,
  row: PropTypes.any,
  disabled: PropTypes.bool,
};

Row.displayName = 'Row';

export default Row;
