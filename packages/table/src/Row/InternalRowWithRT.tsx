import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useTableContext } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';

import InternalRowBase from './InternalRowBase';
import {
  expandedContentParentStyles,
  grayZebraRowStyles,
  selectedRowStyles,
  zebraStyles,
} from './Row.styles';
import { InternalRowWithRTProps } from './Row.types';
import RowCellChildren from './RowCellChildren';
import { useRowContext } from './RowContext';

/**
 * Renders row data provided by `useReactTable`
 */
const InternalRowWithRT = <T extends LGRowData>({
  children,
  className,
  row,
  virtualRow,
  ...rest
}: InternalRowWithRTProps<T>) => {
  const { theme } = useDarkMode();
  const { disabled } = useRowContext();
  const { table, shouldAlternateRowColor } = useTableContext();
  const isOddVSRow = !!virtualRow && virtualRow.index % 2 !== 0;

  const isExpanded = row.getIsExpanded();
  const isSelected = row.getIsSelected();
  const isParentExpanded = row.getParentRow()
    ? row.getParentRow()?.getIsExpanded()
    : false;

  return (
    <InternalRowBase
      className={cx(
        {
          [grayZebraRowStyles[theme]]:
            isOddVSRow && shouldAlternateRowColor && !isSelected,
          [zebraStyles[theme]]:
            !virtualRow && shouldAlternateRowColor && !isSelected,
          [selectedRowStyles[theme]]: isSelected && !disabled,
          [expandedContentParentStyles[theme]]: isExpanded || isParentExpanded,
        },
        className,
      )}
      data-selected={isSelected}
      data-expanded={isExpanded}
      id={`lg-table-row-${row.id}`}
      ref={node => {
        if (virtualRow && table) table.virtual.measureElement(node);
      }}
      data-index={virtualRow ? virtualRow!.index : ''}
      {...rest}
    >
      <RowCellChildren row={row}>{children}</RowCellChildren>
    </InternalRowBase>
  );
};

export default InternalRowWithRT;
