import React, {
  Children,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { BaseHeader, BaseHeaderProps, LabelVariants } from '../BaseHeader';
import { Chart } from '../Chart/Chart';

import { getHeaderStyles, getWrapperStyles } from './ChartCard.styles';

interface ChartCardProps
  extends HTMLElementProps<'div'>,
    PropsWithChildren,
    Omit<BaseHeaderProps, 'labelProps' | 'collapsedButtonProps'> {
  label: string;
  numOfCharts: number;
  defaultOpen?: boolean;
}

export function ChartCard({
  children,
  className,
  label,
  numOfCharts,
  moreInfoButtonProps,
  closeButtonProps,
  fullScreenButtonProps,
  resetButtonProps,
  inputContent,
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
        moreInfoButtonProps={moreInfoButtonProps}
        closeButtonProps={closeButtonProps}
        fullScreenButtonProps={fullScreenButtonProps}
        resetButtonProps={resetButtonProps}
        inputContent={
          collapsed ? (
            <Body weight="regular" baseFontSize={BaseFontSize.Body1}>
              ({numOfCharts} Hidden Metrics)
            </Body>
          ) : (
            inputContent
          )
        }
        className={getHeaderStyles(theme)}
        ref={headerRef}
      />
      {children}
    </div>
  );
}
