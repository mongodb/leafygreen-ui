import React, { Fragment, PropsWithRef, useMemo } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps, isComponentType } from '@leafygreen-ui/lib';
import { Polymorph } from '@leafygreen-ui/polymorphic';

import { useTableContext } from '../TableContext/TableContext';
import { LGRowData } from '../useLeafyGreenTable';

import InternalRowBase from './InternalRowBase';
import {
  expandedContentParentStyles,
  rowExpandedStyles,
  rowTopLevelExpandedStyles,
  rowTopLevelStyles,
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
  const { table, getParentRow } = useTableContext();
  const parentRow = getParentRow?.(row.id);
  const rowRef = virtualRow?.measureRef;

  const isTableExpandable = table?.getCanSomeRowsExpand();
  const isNested = !!parentRow
  const isParentExpanded = !!parentRow && parentRow.getIsExpanded()
  const isRowVisible = isParentExpanded || !isNested

  const isExpanded = row.getIsExpanded();// Is this row currently expanded

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

  const tBodyProps: PropsWithRef<HTMLElementProps<'tbody'>> = {
    className: expandedContentParentStyles,
    'data-expanded': isExpanded,
    'data-testid': 'lg-table-expandable-row-tbody',
    // @ts-expect-error - VirtualItem.measureRef is not typed as a ref
    ref: rowRef,
  };

  return (
    <Polymorph as={containerAs} {...(shouldRenderAsTBody ?? tBodyProps)}>
      <InternalRowBase
        className={cx(
          {
            [rowTopLevelStyles]: !isNested,
            [rowTopLevelExpandedStyles[theme]]: isExpanded && !isNested,
            [rowExpandedStyles[theme]]: isExpanded || isParentExpanded,
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
