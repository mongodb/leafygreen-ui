import React, { Fragment, useMemo } from 'react';
import { VirtualItem } from '@tanstack/react-virtual';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { Polymorph } from '@leafygreen-ui/polymorphic';

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
  const { table, getParentRow, shouldAlternateRowColor } = useTableContext();
  const parentRow = getParentRow?.(row.id);
  // const rowRef = virtualRow?.measureRef;

  const isTableExpandable = table?.getCanSomeRowsExpand();
  const isNested = !!parentRow;
  const isParentExpanded = !!parentRow && parentRow.getIsExpanded();
  const isRowVisible = isParentExpanded || !isNested;
  const isOddVSRow = !!virtualRow && virtualRow.index % 2 !== 0;

  const isExpanded = row.getIsExpanded();
  const isSelected = row.getIsSelected();

  // const isVirtualRow = !!virtualRow;

  // console.log({ isVirtualRow });

  /**
   * Render the row within a `tbody` if
   * the table itself has any row that is expandable
   * but not if this row is nested
   */
  const shouldRenderAsTBody = isTableExpandable && !isNested;
  const containerAs = useMemo(
    () => (shouldRenderAsTBody ? 'tbody' : Fragment),
    [shouldRenderAsTBody],
  );

  const tBodyProps: HTMLElementProps<'tbody'> & VirtualItem = {
    className: cx({
      [expandedContentParentStyles[theme]]: isExpanded,
    }),
    // @ts-ignore - TODO: ?
    'data-expanded': isExpanded,
  };

  return (
    <Polymorph as={containerAs} {...(shouldRenderAsTBody && tBodyProps)}>
      <InternalRowBase
        className={cx(
          {
            [grayZebraRowStyles[theme]]:
              isOddVSRow && shouldAlternateRowColor && !isSelected,
            [zebraStyles[theme]]:
              !virtualRow && shouldAlternateRowColor && !isSelected,
            [selectedRowStyles[theme]]: isSelected && !disabled,
          },
          className,
          css`
            ${!!virtualRow &&
            css`
              /* transform: translateY(${virtualRow.start}px); */
              /* transform: translateY(
                ${virtualRow.start - virtualRow.index * virtualRow.size}px
              ); */
            `}
          `,
        )}
        data-selected={isSelected}
        aria-hidden={!isRowVisible}
        data-expanded={isExpanded}
        id={`lg-table-row-${row.id}`}
        // ref={table.virtual.measureElement}
        // data-index={virtualRow!.index ?? ''}
        {...rest}
      >
        <RowCellChildren row={row}>{children}</RowCellChildren>
      </InternalRowBase>
    </Polymorph>
  );
};

export default InternalRowWithRT;
