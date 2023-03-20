import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';

import { useTableContext } from '../TableContext/TableContext';

import { rowExpandedStyles } from './Row.styles';
import { InternalRowWithRTProps } from './Row.types';
import Row from '.';

const SubRow = <T extends unknown>({
  className,
  row: subRow,
  children,
  ...rest
}: InternalRowWithRTProps<T>) => {
  const { getParentRow } = useTableContext();
  const parentRow = getParentRow?.(subRow.id);

  const { theme } = useDarkMode();
  const isExpanded = parentRow?.getIsExpanded();
  const CellChildren = React.Children.toArray(children).filter(child =>
    isComponentType(child, 'Cell'),
  );
  const OtherChildren = React.Children.toArray(children).filter(
    child => !isComponentType(child, 'Cell'),
  );

  return (
    <Row
      row={subRow}
      // isNestedRow
      // aria-hidden={!isExpanded}
      className={cx(
        {
          [rowExpandedStyles[theme]]: isExpanded,
        },
        className,
      )}
      {...rest}
    >
      {children}
      {/* {CellChildren}
      {OtherChildren} */}
    </Row>
  );
};

export default SubRow;
