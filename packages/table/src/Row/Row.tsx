import React, { ForwardedRef, ReactElement, Ref } from 'react';
import PropTypes from 'prop-types';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useTableContext } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';

import InternalRowWithoutRT from './InternalRowWithoutRT';
import MemoizedInternalRowWithRT from './InternalRowWithRT';
import { forwardRefWithGenerics, RowProps } from './Row.types';
import { RowContextProvider } from './RowContext';

/**
 * Renders the provided cells
 */

// const Row = forwardRefWithGenerics(function Row<T extends LGRowData>(
//   { row, virtualRow, disabled = false, ...rest }: RowProps<T>,
//   ref: ForwardedRef<HTMLTableRowElement>,
// ) {
//   const { theme } = useDarkMode();
//   const { shouldAlternateRowColor = false, virtualTable } = useTableContext();

//   return (
//     <>
//       {row ? (
//         <MemoizedInternalRowWithRT
//           row={row}
//           virtualRow={virtualRow}
//           theme={theme}
//           measureElement={virtualTable?.measureElement}
//           shouldAlternateRowColor={shouldAlternateRowColor}
//           isExpanded={row.getIsExpanded()}
//           isParentExpanded={
//             (row.getParentRow() && row.getParentRow()?.getIsExpanded()) ?? false
//           }
//           isSelected={row.getIsSelected()}
//           ref={ref}
//           disabled={disabled}
//           {...rest}
//         />
//       ) : (
//         <RowContextProvider disabled={disabled}>
//           <InternalRowWithoutRT ref={ref} {...rest} />
//         </RowContextProvider>
//       )}
//     </>
//   );
// });

const RowWithForwardRef = function Row<T extends LGRowData>(
  { row, virtualRow, disabled = false, ...rest }: RowProps<T>,
  ref: ForwardedRef<HTMLTableRowElement>,
) {
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
          disabled={disabled}
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

const Row = React.forwardRef(RowWithForwardRef) as <T extends LGRowData>(
  p: RowProps<T> & { ref?: Ref<HTMLTableRowElement> },
) => ReturnType<typeof RowWithForwardRef>;

// @ts-ignore
Row.propTypes = {
  virtualRow: PropTypes.object,
  row: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Row;
