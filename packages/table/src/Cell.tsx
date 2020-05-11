import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { commonCellStyles } from './styles';

interface CellProps extends React.ComponentPropsWithRef<'td'> {}

const tdStyles = css`
  line-height: 16px;
  letter-spacing: 0px;
`;

const innerDivStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const truncation = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Cell = React.forwardRef(
  ({ children, className }: CellProps, ref: React.Ref<any>) => {
    return (
      <td
        ref={ref}
        className={cx(commonCellStyles, tdStyles, truncation, className)}
      >
        <div className={innerDivStyles}>{children}</div>
      </td>
    );
  },
);

Cell.displayName = 'Cell';

export default Cell;
