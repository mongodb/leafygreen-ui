import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useTableContext } from '../TableContext';

import InternalRowBase from './InternalRowBase';
import { zebraStyles } from './Row.styles';
import { InternalRowBaseProps } from './Row.types';

/**
 * Renders basic array row data
 *
 * @internal
 */
const InternalRowWithoutRT = forwardRef<
  HTMLTableRowElement,
  InternalRowBaseProps
>(({ children, className, ...rest }: InternalRowBaseProps, fwdRef) => {
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
      ref={fwdRef}
      {...rest}
    >
      {children}
    </InternalRowBase>
  );
});

InternalRowWithoutRT.displayName = 'InternalRowWithoutRT';

export default InternalRowWithoutRT;
