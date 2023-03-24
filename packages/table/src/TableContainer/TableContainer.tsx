import React, { forwardRef, PropsWithChildren } from 'react';

import { css, cx } from '@leafygreen-ui/emotion';

import TableContainerProps from './TableContainer.types';

const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  (
    { children, className, ...rest }: PropsWithChildren<TableContainerProps>,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cx(
          css`
            overflow: auto;
            height: 500px;
            width: 100%;
            position: relative;
          `,
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

TableContainer.displayName = 'TableContainer';

export default TableContainer;
