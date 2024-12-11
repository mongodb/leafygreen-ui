import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { getContainerStyles, titleStyles } from './Header.styles';
import { HeaderProps } from './Header.types';

export function Header({
  title,
  showDivider,
  headerContent,
  className,
  ...rest
}: HeaderProps) {
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
      </div>
      <div>{headerContent}</div>
    </div>
  );
}
