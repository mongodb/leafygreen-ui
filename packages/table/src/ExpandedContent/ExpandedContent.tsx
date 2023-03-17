import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import React, { PropsWithChildren } from 'react';
import { useTableContext } from "../TableContext/TableContext";
import { expandedContentStyles, hiddenSubRowStyles, subRowStyles } from './ExpandedContent.styles';
import { ExpandedContentProps } from './ExpandedContent.types';

const ExpandedContent = <T extends unknown>({ row, children }: PropsWithChildren<ExpandedContentProps<T>>) => {
  const { isExpandedRow } = useTableContext();
  const { theme } = useDarkMode();
  return (
    <tr>
      <td
        colSpan={row?.getVisibleCells().length}
        className={cx(
          subRowStyles,
          {
            [hiddenSubRowStyles]: !isExpandedRow(row.id),
          },
          expandedContentStyles[theme],
        )}
      >
        <div
          className={cx(
            css`overflow: hidden;`,
            subRowStyles,
            {
              [hiddenSubRowStyles]: !isExpandedRow(row.id),
            }
          )}
        >
          {children}
        </div>
      </td>
    </tr>
  )
}

export default ExpandedContent;