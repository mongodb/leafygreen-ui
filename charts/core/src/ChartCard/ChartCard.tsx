import React, { PropsWithChildren } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { getWrapperStyles } from './ChartCard.styles';

interface ChartCardProps extends HTMLElementProps<'div'>, PropsWithChildren {}

/**
 * TODO: This needs to have its own header and will wrap charts and be collapsible
 */
export function ChartCard({ children, className, ...rest }: ChartCardProps) {
  const { theme } = useDarkMode();

  return (
    <div className={cx(getWrapperStyles(theme), className)} {...rest}>
      {children}
    </div>
  );
}
