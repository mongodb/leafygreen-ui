import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  expandedContentStyles,
  hiddenSubRowStyles,
  subRowStyles,
} from './ExpandedContent.styles';
import { ExpandedContentProps } from './ExpandedContent.types';

const ExpandedContent = <T extends unknown>({
  row,
}: ExpandedContentProps<T>) => {
  // const { isExpandedRow } = useTableContext();
  const isExpanded = row.getIsExpanded();
  const Content = row?.original?.renderExpandedContent(row);

  const { theme } = useDarkMode();
  return (
    <tr>
      <td
        colSpan={row?.getVisibleCells().length}
        className={cx(
          subRowStyles,
          {
            [hiddenSubRowStyles]: !isExpanded,
          },
          expandedContentStyles[theme],
        )}
      >
        <div
          className={cx(
            css`
              overflow: hidden;
            `,
            subRowStyles,
            {
              [hiddenSubRowStyles]: !isExpanded,
            },
          )}
        >
          {Content}
        </div>
      </td>
    </tr>
  );
};

export default ExpandedContent;
