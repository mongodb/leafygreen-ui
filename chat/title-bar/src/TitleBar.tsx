import React, { ForwardedRef, forwardRef } from 'react';
import { Avatar, Variant as ChatAvatarVariant } from '@lg-chat/avatar';

import { Badge } from '@leafygreen-ui/badge';
import XIcon from '@leafygreen-ui/icon/dist/X';
import { IconButton } from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import {
  getContentContainerStyles,
  getTitleBarStyles,
} from './TitleBar.styles';
import { Align, type TitleBarProps } from './TitleBar.types';

export const TitleBar = forwardRef(
  (
    {
      align = Align.Center,
      badgeText,
      className,
      darkMode: darkModeProp,
      iconSlot,
      onClose,
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
          <div className={getContentContainerStyles({ align })}>
            <Avatar variant={ChatAvatarVariant.Mongo} sizeOverride={24} />
            <Body>
              <strong>{title}</strong>
            </Body>
            {badgeText && <Badge variant="blue">{badgeText}</Badge>}
          </div>
          {!!onClose && (
            <IconButton aria-label="Close chat" onClick={onClose}>
              {iconSlot ? iconSlot : <XIcon />}
            </IconButton>
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

TitleBar.displayName = 'TitleBar';
