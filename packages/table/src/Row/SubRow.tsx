import React, { ReactElement } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';

import { hiddenSubRowStyles, subRowStyles } from '../Cell/Cell.styles';
import { useTableContext } from "../TableContext/TableContext";

import { nestedBgStyles } from './Row.styles';
import { InternalRowWithRTProps } from "./Row.types";
import Row from ".";

const SubRow = <T extends unknown>({ className, row: subRow, children, ...rest }: InternalRowWithRTProps<T>) => {
  const { getParentRow } = useTableContext();
  const parentRow = getParentRow?.(subRow.id)

  const { theme } = useDarkMode();
  const isRendered = parentRow?.getIsExpanded()
  const CellChildren = React.Children.toArray(children).filter((child) => isComponentType(child, 'Cell'));
  const SubRowChildren = React.Children.toArray(children).filter((child) => isComponentType(child, 'SubRow'));

  const styles = cx(subRowStyles, {
    [hiddenSubRowStyles]: !isRendered,
  });

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
  );
};

export default SubRow;
