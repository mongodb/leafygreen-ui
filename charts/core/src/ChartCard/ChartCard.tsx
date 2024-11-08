import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { BaseHeader, LabelVariants } from '../BaseHeader';

import { getWrapperStyles } from './ChartCard.styles';

interface ChartCardProps extends HTMLElementProps<'div'>, PropsWithChildren {}

export function ChartCard({ children, className, ...rest }: ChartCardProps) {
  const { theme } = useDarkMode();

  const [collapsed, setCollapsed] = useState(false);
  const [height, setHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const containerRef = useRef<null | HTMLDivElement>(null);
  const headerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.clientHeight);
    }

    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
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
          value: 'LeafyGreen ChartGroup',
          variant: LabelVariants.Primary,
        }}
        collapseButtonProps={{
          show: true,
          collapsed,
          onClick: setCollapsed,
        }}
        ref={headerRef}
      />
      {children}
    </div>
  );
}
