import React, { ForwardedRef, forwardRef } from 'react';
import { Avatar } from '@lg-chat/avatar';
import { ChatAvatarVariant } from '@lg-chat/avatar/src/Avatar';

import Badge from '@leafygreen-ui/badge';
import { cx } from '@leafygreen-ui/emotion';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import {
  baseStyles,
  contentAlignmentStyles,
  contentContainerStyles,
  themeStyles,
} from './TitleBar.styles';
import { Align, TitleBarProps } from '.';

export const TitleBar = forwardRef(
  (
    {
      title,
      className,
      align = Align.Center,
      onClose,
      badgeText,
      darkMode: darkModeProp,
      iconSlot,
      ...rest
    }: TitleBarProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          className={cx(baseStyles, themeStyles[theme], className)}
          {...rest}
          ref={ref}
        >
          <div
            className={cx(contentContainerStyles, {
              [contentAlignmentStyles]: align === Align.Center,
            })}
          >
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
