import React from 'react';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body, useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { Skeleton } from '..';

import {
  baseStyles,
  cellStyles,
  columnHeaderStyles,
  firstRowStyles,
  headerCellStyles,
  tableHeadStyles,
} from './TableSkeleton.styles';
import { TableSkeletonProps } from '.';

export function TableSkeleton({
  darkMode: darkModeProp,
  baseFontSize: baseFontSizeProp = BaseFontSize.Body1,
  enableAnimations,
  numRows = 5,
  numCols = 4,
  columnLabels,
  className,
  ...rest
}: TableSkeletonProps) {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <table {...rest} className={cx(baseStyles, className)} aria-busy>
        <thead className={tableHeadStyles[theme]}>
          <tr>
            {[...Array(numCols)].map((_, i) => {
              const hasLabel = columnLabels && columnLabels[i];
              return (
                <th key={i} className={cx(cellStyles, headerCellStyles)}>
                  {hasLabel ? (
                    <Body
                      baseFontSize={baseFontSize}
                      className={columnHeaderStyles}
                    >
                      {columnLabels[i]}
                    </Body>
                  ) : (
                    <>
                      <VisuallyHidden>Loading</VisuallyHidden>
                      <Skeleton
                        enableAnimations={enableAnimations}
                        size="small"
                      />
                    </>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {[...Array(numRows)].map((_, i) => (
            <tr key={i}>
              {[...Array(numCols)].map((_, j) => (
                <td key={j} className={cellStyles}>
                  <Skeleton
                    enableAnimations={enableAnimations}
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
