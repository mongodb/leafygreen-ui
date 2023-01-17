import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import React, { PropsWithChildren } from 'react';
import { stickyStyles, themeStyles } from './TableHead.styles';
import { TableHeadProps } from './TableHead.types';

const TableHead = ({
  children,
  isSticky,
  className,
  ...rest
}: PropsWithChildren<TableHeadProps>) => {
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
      {...rest}
    >
      {children}
    </thead>
  );
};

export default TableHead;
