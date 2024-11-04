import React from 'react';
import PropTypes from 'prop-types';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useTableContext, useVirtualTableContext } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';

import InternalRowWithoutRT from './InternalRowWithoutRT';
import { MemoizedInternalRowWithRT } from './InternalRowWithRT';
import { RowProps } from './Row.types';

/**
 * Renders the provided cells
 */
const Row = <T extends LGRowData>({
  row,
  virtualRow,
  ...rest
}: RowProps<T>) => {
  const { theme } = useDarkMode();
  const { shouldAlternateRowColor } = useTableContext();
  const { measureElement } = useVirtualTableContext();
  return (
    <>
      {row ? (
        <MemoizedInternalRowWithRT
          // @ts-ignore FIXME:
          row={row}
          virtualRow={virtualRow}
          theme={theme}
          measureElement={measureElement}
          // @ts-ignore FIXME:
          shouldAlternateRowColor={shouldAlternateRowColor}
          isExpanded={row.getIsExpanded()}
          // @ts-ignore FIXME:
          isParentExpanded={
            row.getParentRow() ? row.getParentRow()?.getIsExpanded() : false
          }
          isSelected={row.getIsSelected()}
          {...rest}
        />
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
