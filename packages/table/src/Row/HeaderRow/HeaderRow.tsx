import React, { PropsWithChildren } from 'react';

import { HeaderRowProps } from './HeaderRow.types';

const HeaderRow = ({
  children,
  ...rest
}: PropsWithChildren<HeaderRowProps>) => {
  return <tr {...rest}>{children}</tr>;
};

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
