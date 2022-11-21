import React, { PropsWithChildren } from 'react';
import { NestedRowProps } from './types';

const NestedRow = ({
  children,
  ...rest
}: PropsWithChildren<NestedRowProps>) => {
  return <tr {...rest}>{children}</tr>;
};

export default NestedRow;
