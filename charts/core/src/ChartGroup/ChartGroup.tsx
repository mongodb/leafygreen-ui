import React, { forwardRef, useMemo, useState } from 'react';

import { getContainerStyles } from './ChartGroup.styles';
import { ChartGroupProps } from './ChartGroup.types';
import { ChartGroupContext } from './ChartGroupContext';

export const ChartGroup = forwardRef<HTMLDivElement, ChartGroupProps>(
  (
    { children, className, enableTooltipSync = true, groupId, ...rest },
    fwdRef,
  ) => {
    const [isSomeChartHovered, setIsSomeChartHovered] = useState(false);

    const contextValue = useMemo(
      () => ({
        enableTooltipSync,
        groupId,
        isSomeChartHovered,
        setIsSomeChartHovered,
      }),
      [enableTooltipSync, groupId, isSomeChartHovered],
    );

    return (
      <ChartGroupContext.Provider value={contextValue}>
        <div ref={fwdRef} className={getContainerStyles(className)} {...rest}>
          {children}
        </div>
      </ChartGroupContext.Provider>
    );
  },
);

ChartGroup.displayName = 'ChartGroup';
