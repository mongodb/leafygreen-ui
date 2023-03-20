import React, { PropsWithChildren } from 'react';

import { RowData } from '..';

import Cell from './Cell';
import { depthPadding } from './Cell.styles';
import { CellProps } from '.';

export const FirstCell = <T extends RowData>({
  children,
  depth,
  ...rest
}: PropsWithChildren<CellProps<T>>) => {
  return (
    <Cell contentClassName={depthPadding(depth)} {...rest}>
      {children}
    </Cell>
  );
};

export default FirstCell;
