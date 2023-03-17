import React, { Fragment, PropsWithRef, RefObject, useMemo } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps, isComponentType } from '@leafygreen-ui/lib';
import { Polymorph } from '@leafygreen-ui/polymorphic';

import { useTableContext } from '../TableContext/TableContext';

import InternalRowBase from './InternalRowBase';
import {
  expandedContentParentStyles,
  nestedBgStyles,
  nestedBorderTopStyles,
} from './Row.styles';
import { InternalRowWithRTProps } from './Row.types';
import RowCellChildren from './RowCellChildren';

const InternalRowWithRT = <T extends unknown>({
  children,
  className,
  row,
  virtualRow,
  disabled,
  ...rest
}: InternalRowWithRTProps<T>) => {
  const { theme } = useDarkMode();
  const { table, getParentRow } = useTableContext();
  const parentRow = getParentRow(row.id)
  const rowRef = virtualRow?.measureRef

  const isTableExpandable = table?.getCanSomeRowsExpand()
  // Is this row nested within other rows?
  const isNestedRow = !!parentRow
  // Is this row currently expanded
  const isExpanded = row.getIsExpanded()

  const CellChildren = React.Children.toArray(children).filter(child =>
    isComponentType(child, 'Cell'),
  );

  const OtherChildren = React.Children.toArray(children).filter(child => !isComponentType(child, 'Cell'),
  );


  /**
   * Render the row within a `tbody` if
   * the table itself has any row that is expandable
   * but not if this row is nested
   */
  const shouldRenderAsTBody = isTableExpandable && !isNestedRow
  const containerAs = useMemo(() => shouldRenderAsTBody ? 'tbody' : Fragment, [shouldRenderAsTBody])

  const tBodyProps: PropsWithRef<HTMLElementProps<'tbody'>> = {
    className: expandedContentParentStyles,
    "data-expanded": isExpanded,
    "data-testid": "lg-table-expandable-row-tbody",
    // @ts-expect-error - VirtualItem.measureRef is not typed as a ref
    ref: rowRef
  }

  return (
    <>
      <Polymorph as={containerAs} {...(shouldRenderAsTBody ?? tBodyProps)}>
        <InternalRowBase
          className={cx(
            {
              [nestedBorderTopStyles[theme]]: isExpanded && !isNestedRow,
              [nestedBgStyles[theme]]: isExpanded,
            },
            className,
          )}
          disabled={disabled}
          data-depth={row.depth}
          {...rest}
        >
          <RowCellChildren row={row} disabled={disabled}>
            {CellChildren}
          </RowCellChildren>
        </InternalRowBase>
        {OtherChildren}
      </Polymorph>
    </>
  );
};

export default InternalRowWithRT;
