import React, { ForwardedRef, forwardRef } from 'react';
import { Avatar, Variant as ChatAvatarVariant } from '@lg-chat/avatar';
import {
  useLeafyGreenChatContext,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';

import { Badge } from '@leafygreen-ui/badge';
import XIcon from '@leafygreen-ui/icon/dist/X';
import { IconButton } from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { consoleOnce } from '@leafygreen-ui/lib';
import { Body } from '@leafygreen-ui/typography';

import {
  getContentContainerStyles,
  getTitleBarStyles,
} from './TitleBar.styles';
import { Align, type TitleBarProps } from './TitleBar.types';

export const TitleBar = forwardRef(
  (
    {
      align: alignProp = Align.Center,
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
    const { variant } = useLeafyGreenChatContext();
    const isCompact = variant === Variant.Compact;

    if (isCompact && (alignProp !== Align.Center || iconSlot || onClose)) {
      consoleOnce.warn(
        `@lg-chat/title-bar: The TitleBar component's props 'align', 'iconSlot', and 'onClose' are only used in the 'spacious' variant. They will not be rendered in the 'compact' variant set by the provider.`,
      );
    }

    const align = isCompact ? Align.Center : alignProp;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          className={getTitleBarStyles({ theme, className })}
          {...rest}
          ref={ref}
        >
          <div className={getContentContainerStyles({ align })}>
            {!isCompact && (
              <Avatar variant={ChatAvatarVariant.Mongo} sizeOverride={24} />
            )}
            <Body>
              <strong>{title}</strong>
            </Body>
            {badgeText && <Badge variant="blue">{badgeText}</Badge>}
          </div>
          {!isCompact && !!onClose && (
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
