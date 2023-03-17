import React, { Fragment, ReactElement, ReactNode, useMemo } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps, isComponentType } from '@leafygreen-ui/lib';

import Cell from '../Cell';
import { hiddenSubRowStyles, subRowStyles } from '../Cell/Cell.styles';
import { useTableContext } from '../TableContext/TableContext';
import { LeafygreenTableRow } from '../useLeafygreenTable';

import InternalRowBase from './InternalRowBase';
import {
  expandedContentParentStyles,
  expandedContentStyles,
  nestedBgStyles,
  nestedBorderTopStyles,
} from './Row.styles';
import { InternalRowWithRTProps } from './Row.types';

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
  const isNestedRowParent = row.depth === 0 && isExpandedRow(row.id);
  const isNestedRowOrParent = isExpandedRow(row.id) || row.depth > 0;
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
              [nestedBorderTopStyles[theme]]: isNestedRowParent,
              [nestedBgStyles[theme]]: isNestedRowOrParent,
            },
            className,
          )}
          disabled={disabled}
          data-depth={row.depth}
          {...rest}
        >
          {React.Children.map(
            CellChildren,
            (CellChild: ReactNode, index: number) => {
              return React.createElement(Cell, {
                ...(CellChild as ReactElement)?.props,
                cellIndex: index,
                depth: row.depth,
                disabled,
              });
            },
          )}
        </InternalRowBase>
        {ExpandedContentRowProp && (
          <tr>
            <td
              colSpan={row?.getVisibleCells().length}
              className={cx(
                subRowStyles,
                {
                  [hiddenSubRowStyles]: !isExpandedRow(row.id),
                },
                expandedContentStyles[theme],
              )}
            >
              <div
                className={cx(subRowStyles, {
                  [hiddenSubRowStyles]: !isExpandedRow(row.id),
                })}
              >
                {ExpandedContentRowProp(row as LeafygreenTableRow<T>)}
              </div>
            </td>
          </tr>
        )}
        {SubRowChildren}
      </ContainerElement>
    </>
  );
};

export default InternalRowWithRT;
