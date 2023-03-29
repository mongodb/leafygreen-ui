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
            max-height: 500px;
            width: 100%;
            position: relative;
          `,
          className,
        )}
        // allow select by keyboard to allow scroll by keyboard
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

TableContainer.displayName = 'TableContainer';

export default TableContainer;
