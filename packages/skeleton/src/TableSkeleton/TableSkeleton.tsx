import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { Skeleton } from '..';

import { baseStyles, cellStyles } from './TableSkeleton.styles';
import { TableSkeletonProps } from '.';

export function TableSkeleton({
  darkMode: darkModeProp,
  numRows = 5,
  numCols,
  columnLabels,
  className,
  ...rest
}: TableSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <table {...rest} className={cx(baseStyles, className)}>
        <thead>
          <tr>
            {[...Array(numCols)].map((_, i) => (
              <th key={i} className={cellStyles}>
                {columnLabels && columnLabels[i] ? (
                  <Body>{columnLabels[i]}</Body>
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
                  <Skeleton size="small" />
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
