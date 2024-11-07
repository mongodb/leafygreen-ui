import React, { PropsWithChildren } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getBaseStyles } from './HeaderRow.styles';
import { HeaderRowProps } from './HeaderRow.types';

const HeaderRow = ({
  children,
  className,
  ...rest
}: PropsWithChildren<HeaderRowProps>) => {
  const { theme } = useDarkMode();
  return (
    <tr className={cx(getBaseStyles(theme), className)} {...rest}>
      {children}
    </tr>
  );
};

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
