import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import {
  ComponentContextProvider,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { clickableStyles, disabledStyles } from './Row.styles';
import { InternalRowBaseProps } from './Row.types';

/**
 * The base Row component, extended by `InternalRow(With/Without)RT`
 */
const InternalRowBase = ({
  className,
  onClick,
  disabled,
  ['aria-selected']: selected,
  ...rest
}: InternalRowBaseProps) => {
  const { theme } = useDarkMode();
  return (
    <ComponentContextProvider
      contextComponent={'lgTableRow'}
      componentProps={{
        disabled,
        selected,
      }}
    >
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
    </ComponentContextProvider>
  );
};

export default InternalRowBase;
