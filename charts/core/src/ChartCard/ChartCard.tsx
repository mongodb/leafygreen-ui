import React, { useEffect, useRef, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { BaseHeader, LabelVariants } from '../BaseHeader';

import { getHeaderStyles, getWrapperStyles } from './ChartCard.styles';
import { ChartCardProps } from './ChartCard.types';

export function ChartCard({
  children,
  className,
  label,
  headerContent,
  defaultOpen = true,
  ...rest
}: ChartCardProps) {
  const { theme } = useDarkMode();

  const [collapsed, setCollapsed] = useState(!defaultOpen);
  const [height, setHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const containerRef = useRef<null | HTMLDivElement>(null);
  const headerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }

    if (headerRef.current) {
      // Account for 1px border
      setHeaderHeight(headerRef.current.offsetHeight + 1);
    }
  }, []);

  return (
    <div
      className={cx(
        getWrapperStyles(theme, height, headerHeight),
        className,
        collapsed && 'collapsed',
      )}
      ref={containerRef}
      {...rest}
    >
      <BaseHeader
        labelProps={{
          value: label,
          variant: LabelVariants.Primary,
        }}
        collapseButtonProps={{
          show: true,
          onClick: (collapsedState: boolean) => {
            setCollapsed(collapsedState);
          },
          collapsed,
        }}
        headerContent={headerContent}
        className={getHeaderStyles(theme)}
        ref={headerRef}
      />
      {children}
    </div>
  );
}
