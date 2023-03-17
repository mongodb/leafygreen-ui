import React, { ReactElement } from 'react';

import { isComponentType } from '@leafygreen-ui/lib';

import { useTableContext } from "../TableContext/TableContext";

import { InternalRowWithRTProps } from "./Row.types";
import Row from ".";

const getParentRowId = (childId: string) => {
  const childIds = childId.split('.')
  const parentId = childIds.slice(0, childIds.length - 1).join('.')
  return parentId
}

const SubRow = <T extends unknown>({ row: subRow, children, ...rest }: InternalRowWithRTProps<T>) => {
  const parentRowId = getParentRowId(subRow.id)
  const { isExpandedRow } = useTableContext();
  const CellChildren = React.Children.toArray(children).filter((child) => isComponentType(child, 'Cell'));
  const SubRowChildren = React.Children.toArray(children).filter((child) => isComponentType(child, 'SubRow'));
  return (
    <Row
      row={subRow}
      isNestedRow
      aria-hidden={!isExpandedRow(parentRowId)}
      {...rest}
    >
      {CellChildren.map((CellChild, index) => {
        return React.cloneElement(CellChild as ReactElement, {
          ...(CellChild as ReactElement)?.props,
          cellIndex: index,
          isSubRowCell: true,
          isRenderedSubRowCell: isExpandedRow(parentRowId)
        });
      })}
      {SubRowChildren}
    </Row>
  )
}

export default SubRow;