import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { alignLeft, alignRight, commonCellStyles } from './styles';

type CellProps = React.ComponentPropsWithRef<'td'>;

const Cell = React.forwardRef(
  ({ children }: CellProps, ref: React.Ref<any>) => {
    const type = typeof children === 'number' ? 'number' : 'string';

    return (
      <td
        ref={ref}
        className={cx(
          type === 'number' ? alignRight : alignLeft,
          commonCellStyles,
          css`
            border-top: 1px solid ${uiColors.gray.light2};
            border-bottom: 1px solid ${uiColors.gray.light2};
            line-height: 16px;
            letter-spacing: 0px;
            color: ${uiColors.gray.dark2};
          `,
        )}
      >
        {children}
      </td>
    );
  },
);

Cell.displayName = 'Cell';

export default Cell;
