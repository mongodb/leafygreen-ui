import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import React, { PropsWithChildren } from 'react';
import { useTableContext } from '../TableContext';
import { baseStyles, clickableStyles, disabledStyles, zebraStyles } from './Row.styles';
import { InternalRowBaseProps } from './types';

const InternalRowBase = ({
  className,
  onClick,
  disabled,
  ...rest
}: PropsWithChildren<InternalRowBaseProps>) => {
  const { theme } = useDarkMode();
  const { shouldAlternateRowColor } = useTableContext();
  return (
    <tr
      onClick={onClick}
      aria-disabled={disabled}
      className={cx(
        baseStyles,
        {
          [zebraStyles[theme]]: shouldAlternateRowColor,
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
