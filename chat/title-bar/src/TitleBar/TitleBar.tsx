import React, { ForwardedRef, forwardRef } from 'react';

import { Badge } from '@leafygreen-ui/badge';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { getTitleBarStyles } from './TitleBar.styles';
import { type TitleBarProps } from './TitleBar.types';

export const TitleBar = forwardRef(
  (
    {
      badgeText,
      className,
      darkMode: darkModeProp,
      title,
      ...rest
    }: TitleBarProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          className={getTitleBarStyles({ theme, className })}
          {...rest}
          ref={ref}
        >
          <Body>
            <strong>{title}</strong>
          </Body>
          {badgeText && <Badge variant="blue">{badgeText}</Badge>}
        </div>
      </LeafyGreenProvider>
    );
  },
);

TitleBar.displayName = 'TitleBar';
