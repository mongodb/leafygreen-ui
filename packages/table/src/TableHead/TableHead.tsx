import React, { forwardRef, PropsWithChildren } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getBaseStyles } from './TableHead.styles';
import { TableHeadProps } from './TableHead.types';

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  (
    {
      children,
      isSticky,
      className,
      ...rest
    }: PropsWithChildren<TableHeadProps>,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();
    return (
      <thead
        ref={fwdRef}
        className={cx(getBaseStyles(isSticky, theme), className)}
        {...rest}
      >
        {children}
      </thead>
    );
  },
);

TableHead.displayName = 'TableHead';

export default TableHead;
