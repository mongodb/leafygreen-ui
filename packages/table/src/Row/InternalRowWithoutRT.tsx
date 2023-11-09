import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useTableContext } from '../TableContext/TableContext';

import InternalRowBase from './InternalRowBase';
import { zebraStyles } from './Row.styles';
import { InternalRowBaseProps } from './Row.types';

/**
 * Renders basic array row data
 */
const InternalRowWithoutRT = ({
  children,
  className,
  ...rest
}: InternalRowBaseProps) => {
  const { shouldAlternateRowColor } = useTableContext();
  const { theme } = useDarkMode();
  return (
    <InternalRowBase
      className={cx(
        {
          [zebraStyles[theme]]: shouldAlternateRowColor,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </InternalRowBase>
  );
};

export default InternalRowWithoutRT;
