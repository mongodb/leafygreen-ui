import React, { ForwardedRef } from 'react';
import PropTypes from 'prop-types';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useTableContext } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';

import InternalRowWithoutRT from './InternalRowWithoutRT';
import { MemoizedInternalRowWithRT } from './InternalRowWithRT';
import { RowComponentType, RowProps } from './Row.types';

/**
 * Renders the provided cells
 */

const Row = <T extends LGRowData>(
  { row, virtualRow, ...rest }: RowProps<T>,
  ref: ForwardedRef<HTMLTableRowElement>,
) => {
  const { theme } = useDarkMode();
  const { measureElement, shouldAlternateRowColor } = useTableContext();
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
        <InternalRowWithoutRT {...rest} />
      )}
    </>
  );
};

// export const RowWithRef: RowComponentType = React.forwardRef(Row);

// // https://oida.dev/typescript-react-generic-forward-refs/#option-1%3A-type-assertion
// // We can’t assign a generic type variable for RowForwardRef. It becomes unknown by default.
// // This is a type assertion that restores the original function signature.
// FIXME: Try to avoid asserting
export const RowWithRef = React.forwardRef(Row) as RowComponentType;

RowWithRef.propTypes = {
  virtualRow: PropTypes.any,
  row: PropTypes.any,
  disabled: PropTypes.bool,
};

RowWithRef.displayName = 'Row';

export default RowWithRef;
