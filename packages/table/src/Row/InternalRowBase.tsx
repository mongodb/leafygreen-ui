import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { clickableStyles, disabledStyles } from './Row.styles';
import { InternalRowBaseProps } from './Row.types';
import { useRowContext } from './RowContext';

/**
 * The base Row component, extended by `InternalRow(With/Without)RT`
 */
const InternalRowBase = ({
  className,
  onClick,
  ...rest
}: InternalRowBaseProps) => {
  const { theme } = useDarkMode();
  const { disabled } = useRowContext();
  return (
    <tr
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
};

export default InternalRowBase;
