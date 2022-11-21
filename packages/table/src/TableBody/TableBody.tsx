import React, { PropsWithChildren } from 'react';
import { TableBodyProps } from './types';

const TableBody = ({
  children,
  ...rest
}: PropsWithChildren<TableBodyProps>) => {
  return <tbody {...rest}>{children}</tbody>;
};

export default TableBody;
