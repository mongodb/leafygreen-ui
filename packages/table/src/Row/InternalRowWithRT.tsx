import React, { Fragment, useMemo } from 'react';
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
  rowTopLevelExpandedStyles,
  rowTopLevelStyles,
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

  const isExpanded = row.getIsExpanded(); // Is this row currently expanded

  const CellChildren = React.Children.toArray(children).filter(child =>
    isComponentType(child, 'Cell'),
  );

  const OtherChildren = React.Children.toArray(children).filter(
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

  const tBodyProps: HTMLElementProps<'tbody'> & Pick<VirtualItem, 'measureRef'> = {
    className: cx(
      {
        [expandedContentParentStyles]: isExpanded,
      }
    ),
    'data-expanded': isExpanded,
    'data-testid': 'lg-table-expandable-row-tbody',
    // @ts-expect-error - VirtualItem.measureRef is not typed as a ref
    ref: rowRef,
  };

  return (
    <Polymorph as={containerAs} {...(shouldRenderAsTBody && tBodyProps)}>
      <InternalRowBase
        className={cx(
          {
            [rowTopLevelStyles]: !isNested,
            [rowTopLevelExpandedStyles[theme]]: isExpanded && !isNested,
            [grayZebraRowStyles[theme]]: isOddVSRow,
            [zebraStyles[theme]]: !virtualRow && shouldAlternateRowColor,
          },
          className,
        )}
        disabled={disabled}
        aria-hidden={!isRowVisible}
        aria-expanded={isExpanded}
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
