import React, { forwardRef, PropsWithChildren } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { stickyStyles, themeStyles } from './TableHead.styles';
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
        className={cx(
          {
            [stickyStyles]: isSticky,
          },
          themeStyles[theme],
          className,
        )}
        ref={fwdRef}
        {...rest}
      >
        {children}
      </thead>
    );
  },
);

TableHead.displayName = 'TableHead';

export default TableHead;
