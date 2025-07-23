import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { getContainerStyles, titleStyles } from './ChartHeader.styles';
import { ChartHeaderProps } from './ChartHeader.types';

export function ChartHeader({
  title,
  titleIcon,
  showDivider,
  headerContent,
  className,
  ...rest
}: ChartHeaderProps) {
  const { theme } = useDarkMode();
  return (
    <div
      className={cx(getContainerStyles(theme, showDivider), className)}
      {...rest}
    >
      <div className={titleStyles}>
        <Body weight="regular" baseFontSize={BaseFontSize.Body1}>
          {title}
        </Body>
        {titleIcon && <div>{titleIcon}</div>}
      </div>
      <div>{headerContent}</div>
    </div>
  );
}
