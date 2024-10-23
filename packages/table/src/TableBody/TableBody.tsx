import React from 'react';

import { TableBodyProps } from './TableBody.types';

const TableBody = ({ children, ...rest }: TableBodyProps) => {
  return <tbody {...rest}>{children}</tbody>;
};

TableBody.displayName = 'TableBody';

export default TableBody;
