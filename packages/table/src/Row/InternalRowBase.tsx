import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import React, { PropsWithChildren } from 'react';
import { useTableContext } from '../TableContext';
import { baseStyles, themeZebraStyles } from './styles';
import { InternalRowBaseProps } from './types';

const InternalRowBase = ({ className, ...rest }: PropsWithChildren<InternalRowBaseProps>) => {
  const { theme } = useDarkMode();
  const { shouldAlternateRowColor } = useTableContext();
  return (
    <tr
      className={cx(
        baseStyles,
        {
          [themeZebraStyles[theme]]: shouldAlternateRowColor,
        },
        className,
      )}
      {...rest}
    />
  );
};

export default InternalRowBase;
