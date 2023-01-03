import { css, cx } from '@leafygreen-ui/emotion';
import React, { PropsWithChildren } from 'react';

const ExpandedContent = ({
  children,
  className,
  row,
  virtualRow,
  ...rest
}: PropsWithChildren<any>) => {
  return (
    <>
      {row.getIsExpanded() && (
        <tr
        // className={
        //   cx(
        //     {
        //       [css`
        //       height: ${virtualRow?.size}px;
        //       transform: translateY(${virtualRow?.start}px);
        //   `]: !!virtualRow,
        //     }
        //   )
        // }
        >
          {/* the expanded row is a custom 1 cell row */}
          <td colSpan={row.getVisibleCells().length}>
            <div className={className} {...rest}>
              {children}
            </div>
          </td>
        </tr>
      )
      }
    </>
  );
};

export default ExpandedContent;
