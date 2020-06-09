import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { commonCellStyles } from './styles';

interface CellProps extends React.ComponentPropsWithRef<'td'> {}

const tdStyles = css`
  line-height: 16px;
  position: relative;
`;

const innerDivStyles = css`
  display: flex;
  align-items: center;
`;

const Cell = React.forwardRef(
  ({ children, className, ...rest }: CellProps, ref: React.Ref<any>) => {
    return (
      <td
        ref={ref}
        className={cx(commonCellStyles, tdStyles, className)}
        {...rest}
      >
        <div className={cx(innerDivStyles)}>{children}</div>
      </td>
    );
  },
);

Cell.displayName = 'Cell';

export default Cell;
