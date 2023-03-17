import React, { ReactElement } from 'react';

import { isComponentType } from '@leafygreen-ui/lib';

import { useTableContext } from "../TableContext/TableContext";

import { InternalRowWithRTProps } from "./Row.types";
import Row from ".";
import { cx } from '@leafygreen-ui/emotion';
import { hiddenSubRowStyles, subRowStyles } from '../Cell/Cell.styles';
import { nestedBgStyles } from './Row.styles';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

const getParentRowId = (childId: string) => {
  const childIds = childId.split('.')
  const parentId = childIds.slice(0, childIds.length - 1).join('.')
  return parentId
}


const SubRow = <T extends unknown>({ className, row: subRow, children, ...rest }: InternalRowWithRTProps<T>) => {
  const parentRowId = getParentRowId(subRow.id)
  const { isExpandedRow } = useTableContext();
  const { theme } = useDarkMode();
  const isRendered = isExpandedRow(parentRowId)
  const CellChildren = React.Children.toArray(children).filter((child) => isComponentType(child, 'Cell'));
  const SubRowChildren = React.Children.toArray(children).filter((child) => isComponentType(child, 'SubRow'));

  const styles = cx(
    subRowStyles,
    {
      [hiddenSubRowStyles]: !isRendered,
    }
  )

  return (
    <Row
      row={subRow}
      isNestedRow
      aria-hidden={!isRendered}
      className={cx(
        {
          [nestedBgStyles[theme]]: isRendered,
        },
        className,
      )}
      {...rest}
    >
      {CellChildren.map((CellChild, index) => {
        const { className, ...rest } = (CellChild as ReactElement)?.props;
        return React.cloneElement(CellChild as ReactElement, {
          ...rest,
          cellIndex: index,
          className: cx(styles, className),
          contentClassName: cx(styles, className),
        });
      })}
      {SubRowChildren}
    </Row>
  )
}

export default SubRow;