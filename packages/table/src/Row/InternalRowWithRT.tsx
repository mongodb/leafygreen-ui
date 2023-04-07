import React, { Fragment, useMemo } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import { VirtualItem } from 'react-virtual';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps, isComponentType } from '@leafygreen-ui/lib';
import { Polymorph } from '@leafygreen-ui/polymorphic';

import { useTableContext } from '../TableContext/TableContext';
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

/**
 * Renders row data provided by `useReactTable`
 */
const InternalRowWithRT = <T extends LGRowData>({
  children,
  className,
  row,
  virtualRow,
  disabled,
  ...rest
}: InternalRowWithRTProps<T>) => {
  const { theme } = useDarkMode();
  const { table, getParentRow, shouldAlternateRowColor } = useTableContext();
  const parentRow = getParentRow?.(row.id);
  const rowRef = virtualRow?.measureRef;

  const isTableExpandable = table?.getCanSomeRowsExpand();
  const isNested = !!parentRow;
  const isParentExpanded = !!parentRow && parentRow.getIsExpanded();
  const isRowVisible = isParentExpanded || !isNested;
  const isOddVSRow = !!virtualRow && virtualRow.index % 2 !== 0;

  const isExpanded = row.getIsExpanded();
  const isSelected = row.getIsSelected();

  const flattenedChildren = flattenChildren(children);

  const CellChildren = flattenedChildren.filter(child =>
    isComponentType(child, 'Cell'),
  );

  /**
   * OtherChildren is looking for nested Row components or ExpandedContent components.
   * This filter does not look explicitly for those two components since we may want to allow developers to use their own `td` elements.
   */
  const OtherChildren = flattenedChildren.filter(
    child => !isComponentType(child, 'Cell'),
  );

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

  const tBodyProps: HTMLElementProps<'tbody'> &
    Pick<VirtualItem, 'measureRef'> = {
    className: cx({
      [expandedContentParentStyles[theme]]: isExpanded,
    }),
    'data-expanded': isExpanded,
    // @ts-expect-error - VirtualItem.measureRef is not typed as a ref
    ref: rowRef,
  };

  return (
    <Polymorph as={containerAs} {...(shouldRenderAsTBody && tBodyProps)}>
      <InternalRowBase
        className={cx(
          {
            [grayZebraRowStyles[theme]]: isOddVSRow && shouldAlternateRowColor,
            [zebraStyles[theme]]: !virtualRow && shouldAlternateRowColor,
            [selectedRowStyles[theme]]: isSelected,
          },
          className,
        )}
        data-selected={isSelected}
        disabled={disabled}
        aria-hidden={!isRowVisible}
        id={`lg-table-row-${row.id}`}
        {...rest}
      >
        <RowCellChildren row={row} disabled={disabled}>
          {CellChildren}
        </RowCellChildren>
      </InternalRowBase>
      {OtherChildren}
    </Polymorph>
  );
};

export default InternalRowWithRT;
