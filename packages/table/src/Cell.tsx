import React from 'react';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { commonCellStyles } from './styles';

export const tdInnerDiv = createDataProp('td-inner-div');

type CellProps = HTMLElementProps<'td', HTMLTableCellElement>

const tdStyles = css`
  line-height: 20px;
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
        <div className={innerDivStyles} {...tdInnerDiv.prop}>
          {children}
        </div>
      </td>
    );
  },
);

Cell.displayName = 'Cell';

export default Cell;
