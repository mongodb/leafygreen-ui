import React, { forwardRef, PropsWithChildren } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getBaseStyles } from './HeaderRow.styles';
import { HeaderRowProps } from './HeaderRow.types';

const HeaderRow = forwardRef<HTMLTableRowElement, HeaderRowProps>(
  (
    { children, className, ...rest }: PropsWithChildren<HeaderRowProps>,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();
    return (
      <tr
        ref={fwdRef}
        className={cx(getBaseStyles(theme), className)}
        {...rest}
      >
        {children}
      </tr>
    );
  },
);

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
