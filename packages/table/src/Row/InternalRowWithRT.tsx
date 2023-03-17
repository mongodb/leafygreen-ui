import React, { Fragment, ReactElement, ReactNode, useMemo } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps, isComponentType } from '@leafygreen-ui/lib';

import Cell from '../Cell';
import { useTableContext } from '../TableContext/TableContext';
import { LeafygreenTableRow } from '../useLeafygreenTable';

import InternalRowBase from './InternalRowBase';
import {
  expandedContentParentStyles,
  nestedBgStyles,
  nestedBorderTopStyles,
} from './Row.styles';
import { InternalRowWithRTProps } from './Row.types';
import ExpandedContent from '../ExpandedContent/ExpandedContent';
import RowCellChildren from './RowCellChildren';

const InternalRowWithRT = <T extends unknown>({
  children,
  className,
  row,
  virtualRow,
  disabled,
  isNestedRow,
  ...rest
}: InternalRowWithRTProps<T>) => {
  const { theme } = useDarkMode();
  const { isExpandedRow } = useTableContext();
  const isNestedRowParent = isExpandedRow(row.id);
  const ExpandedContentRowProp = row?.original.renderExpandedContent;
  const CellChildren = React.Children.toArray(children).filter(child =>
    isComponentType(child, 'Cell'),
  );
  const SubRowChildren = React.Children.toArray(children).filter(child =>
    isComponentType(child, 'SubRow'),
  );
  const ContainerElement = useMemo(
    () =>
      ExpandedContentRowProp || !isNestedRow
        ? (props: HTMLElementProps<'tbody'>) => (
          <tbody
            {...props}
            className={expandedContentParentStyles}
            ref={virtualRow ? virtualRow.measureRef : undefined}
            aria-expanded={isExpandedRow(row.id)}
            data-testid="lg-table-expandable-row-tbody"
          />
        )
        : Fragment,
    [ExpandedContentRowProp, isNestedRow],
  );

  return (
    <>
      <ContainerElement>
        <InternalRowBase
          className={cx(
            {
              [nestedBorderTopStyles[theme]]: isNestedRowParent && !isNestedRow,
              [nestedBgStyles[theme]]: isNestedRowParent,
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
        {ExpandedContentRowProp && (
          <ExpandedContent row={row}>
            {ExpandedContentRowProp(row as LeafygreenTableRow<T>)}
          </ExpandedContent>
        )}
        {SubRowChildren}
      </ContainerElement>
    </>
  );
};

export default InternalRowWithRT;
