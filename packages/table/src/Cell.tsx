import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { commonCellStyles } from './styles';

interface CellProps extends React.ComponentPropsWithRef<'td'> {}

const tdStyles = css`
  line-height: 16px;
  letter-spacing: 0px;
  position: relative;
`;

const innerDivStyles = css`
  display: flex;
  flex-direction: row;
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
        <div className={innerDivStyles}>{children}</div>
      </td>
    );
  },
);

Cell.displayName = 'Cell';

export default Cell;
