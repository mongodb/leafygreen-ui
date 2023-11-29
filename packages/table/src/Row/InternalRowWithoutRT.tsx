import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { consoleOnce, isComponentType } from '@leafygreen-ui/lib';

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

  React.Children.forEach(children, child => {
    if (!isComponentType(child, 'Cell'))
      consoleOnce.warn(
        'LG Row is rendering a custom cell element. Utilize the `Cell` component for standardized styles, correct HTML properties and additional functionalities when using `useLeafyGreenTable`.',
      );
  });

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
