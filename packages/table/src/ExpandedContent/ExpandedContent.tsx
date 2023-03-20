import React, { PropsWithChildren } from 'react';
import { RowData } from '@tanstack/react-table';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  baseStyles,
  expandedContentStyles,
  hiddenStyles,
} from './ExpandedContent.styles';
import { ExpandedContentProps } from './ExpandedContent.types';

const ExpandedContent = <T extends RowData>({
  row,
}: ExpandedContentProps<T>) => {
  const isExpanded = row.getIsExpanded();
  const Content = row?.original?.renderExpandedContent && row?.original?.renderExpandedContent(row);

  const { theme } = useDarkMode();
  return (
    <tr>
      <td
        colSpan={row?.getVisibleCells().length}
        className={cx(
          baseStyles,
          {
            [hiddenStyles]: !isExpanded,
          },
          expandedContentStyles[theme],
        )}
      >
        <div
          className={cx(
            css`
              overflow: hidden;
            `,
            baseStyles,
            {
              [hiddenStyles]: !isExpanded,
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
