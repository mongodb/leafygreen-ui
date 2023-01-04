import { cx } from '@leafygreen-ui/emotion';
import React, { PropsWithChildren } from 'react';
import { useTableContext } from '../TableContext';
import { baseStyles, zebraStyles } from './styles';
import { InternalRowBaseProps } from './types';

const InternalRowBase = ({ className, ...rest }: PropsWithChildren<InternalRowBaseProps>) => {
  const { shouldAlternateRowColor } = useTableContext();
  return (
    <tr
      className={cx(
        baseStyles,
        {
          [zebraStyles]: shouldAlternateRowColor,
        },
        className,
      )}
      {...rest}
    />
  );
};

export default InternalRowBase;
