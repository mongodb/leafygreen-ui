import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { Skeleton } from '..';

import {
  baseStyles,
  cellStyles,
  firstRowStyles,
  headerCellStyles,
  tableHeadStyles,
} from './TableSkeleton.styles';
import { TableSkeletonProps } from '.';

export function TableSkeleton({
  darkMode: darkModeProp,
  baseFontSize: baseFontSizeProp,
  numRows = 5,
  numCols = 4,
  columnLabels,
  className,
  ...rest
}: TableSkeletonProps) {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <table aria-busy {...rest} className={cx(baseStyles, className)}>
        <thead className={tableHeadStyles[theme]}>
          <tr>
            {[...Array(numCols)].map((_, i) => (
              <th key={i} className={cx(cellStyles, headerCellStyles)}>
                {columnLabels && columnLabels[i] ? (
                  <>{columnLabels[i]}</>
                ) : (
                  <Skeleton size="small" />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(numRows)].map((_, i) => (
            <tr key={i}>
              {[...Array(numCols)].map((_, j) => (
                <td key={j} className={cellStyles}>
                  <Skeleton
                    size="small"
                    className={cx({ [firstRowStyles]: i === 0 })}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </LeafyGreenProvider>
  );
}

TableSkeleton.displayName = 'TableSkeleton';
