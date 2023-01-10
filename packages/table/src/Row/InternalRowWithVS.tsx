import { cx } from '@leafygreen-ui/emotion';
import React, { Fragment, PropsWithChildren, ReactElement, ReactNode, useState } from 'react';
import InternalCellWithVS from '../Cell/InternalCellWithVS';
import { LeafygreenTableRowData } from '../useLeafygreenTable/useLeafygreenTable';
import InternalRowBase from './InternalRowBase';
import { nestedBorderTopStyles, nestedBgStyles } from './styles';
import { InternalRowWithVSProps } from './types';

const InternalRowWithVS = <T extends unknown>({
  children,
  className,
  row,
  virtualRow,
  ...rest
}: InternalRowWithVSProps<LeafygreenTableRowData<T>>) => {
  const isNestedRowParent = row && row.depth === 0 && row.getIsExpanded()
  const isNestedRowOrParent = row && (row.getIsExpanded() || row.depth > 0);
  const ExpandedContentRowProp = row && row?.original.renderExpandedContent;
  const ContainerElement = ExpandedContentRowProp ? (props: any) => <tbody {...props} ref={virtualRow && virtualRow.measureRef} /> : Fragment;

  return (
    <ContainerElement>
      <InternalRowBase
        className={
          cx(
            {
              [nestedBorderTopStyles]: isNestedRowParent,
              [nestedBgStyles]: isNestedRowOrParent,
            },
            className
          )
        }
        {...rest}
      >
        {React.Children.map(children, (child: ReactNode, index: number) => {
          return React.createElement(InternalCellWithVS, {
            ...(child as ReactElement)?.props,
            cellIndex: index,
            depth: row.depth,

          });
        })}
      </InternalRowBase>
      {row && row.getIsExpanded() && ExpandedContentRowProp &&
        <tr>
          <td colSpan={row?.getVisibleCells().length}>
            {ExpandedContentRowProp(row)}
          </td>
        </tr>
      }
    </ContainerElement>
  );
};

export default InternalRowWithVS;
