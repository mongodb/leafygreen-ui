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
  const { shouldAlternateRowColor } = useTableContext();
  const { measureElement } = useVirtualTableContext();
  return (
    <>
      {row ? (
        <MemoizedInternalRowWithRT
          row={row}
          virtualRow={virtualRow}
          theme={theme}
          measureElement={measureElement}
          shouldAlternateRowColor={shouldAlternateRowColor}
          isExpanded={row.getIsExpanded()}
          isParentExpanded={
            row.getParentRow() ? row.getParentRow()?.getIsExpanded() : false
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

// export const Row: RowComponentType = React.forwardRef(Row);

// // https://oida.dev/typescript-react-generic-forward-refs/#option-1%3A-type-assertion
// // We can’t assign a generic type variable for RowForwardRef. It becomes unknown by default.
// // This is a type assertion that restores the original function signature.
// FIXME: Try to avoid asserting
export const Row = React.forwardRef(RowWithRef) as RowComponentType;

Row.propTypes = {
  virtualRow: PropTypes.any,
  row: PropTypes.any,
  disabled: PropTypes.bool,
};

Row.displayName = 'Row';

export default Row;
