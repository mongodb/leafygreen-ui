import { cx } from '@leafygreen-ui/emotion';
import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { useTableContext } from '../TableContext';

const ExpandableContent = ({
  children,
  className,
  ...rest
}: PropsWithChildren<any>) => {
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
    >
      <td colSpan={row.getVisibleCells().length}>{children}</td>
    </tr>
  );
};

export default ExpandableContent;
