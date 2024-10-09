import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { LGIDS } from '../constants';

import { clickableStyles, disabledStyles } from './Row.styles';
import { InternalRowBaseProps } from './Row.types';
import { useRowContext } from './RowContext';

/**
 * The base Row component, extended by `InternalRow(With/Without)RT`
 */
const InternalRowBase = forwardRef<HTMLTableRowElement, InternalRowBaseProps>(
  ({ className, onClick, ...rest }: InternalRowBaseProps, forwardedRef) => {
    const { theme } = useDarkMode();
    const { disabled } = useRowContext();
    return (
      <tr
        ref={forwardedRef}
        data-lgid={LGIDS.row}
        onClick={onClick}
        aria-disabled={disabled}
        tabIndex={onClick ? 0 : undefined}
        className={cx(
          {
            [disabledStyles[theme]]: disabled,
            [clickableStyles[theme]]: !!onClick,
          },
          className,
        )}
        {...rest}
      />
    );
  },
);

InternalRowBase.displayName = 'InternalRowBase';

export default InternalRowBase;
