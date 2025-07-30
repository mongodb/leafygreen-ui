import React, { forwardRef, PropsWithChildren } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useTableContext } from '../../TableContext';

import { getBaseStyles } from './HeaderRow.styles';
import { HeaderRowProps } from './HeaderRow.types';

const HeaderRow = forwardRef<HTMLTableRowElement, HeaderRowProps>(
  (
    { children, className, ...rest }: PropsWithChildren<HeaderRowProps>,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();
    const { lgIds } = useTableContext();

    return (
      <tr
        ref={fwdRef}
        className={cx(getBaseStyles(theme), className)}
        data-lgid={lgIds.headerRow}
        data-testid={lgIds.headerRow}
        {...rest}
      >
        {children}
      </tr>
    );
  },
);

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
