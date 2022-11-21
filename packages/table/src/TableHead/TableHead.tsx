import React, { PropsWithChildren } from 'react';
import { TableHeadProps } from './types';

const TableHead = ({
  children,
  ...rest
}: PropsWithChildren<TableHeadProps>) => {
  return <thead {...rest}>{children}</thead>;
};

export default TableHead;
