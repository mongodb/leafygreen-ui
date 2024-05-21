import React, { ForwardedRef, forwardRef } from 'react';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';

import { Avatar, Format, getInitials } from '@leafygreen-ui/avatar';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { breakpoints } from '@leafygreen-ui/tokens';

import {
  iconAvatarStyleOverrides,
  logoAvatarStyleOverrides,
  textAvatarStyleOverrides,
} from './ChatAvatar.styles';
import {
  type ChatAvatarProps,
  ChatAvatarSize,
  ChatAvatarVariant,
} from './ChatAvatar.types';

export const chatAvatarSizeMap: Record<ChatAvatarSize, number> = {
  [ChatAvatarSize.Default]: 52,
  [ChatAvatarSize.Small]: 40,
};

export const variantToAvatarFormatMap: Record<ChatAvatarVariant, Format> = {
  [ChatAvatarVariant.Default]: Format.Icon,
  [ChatAvatarVariant.Mongo]: Format.MongoDB,
  [ChatAvatarVariant.User]: Format.Text,
};

export const ChatAvatar = forwardRef(
  (
    {
      variant = ChatAvatarVariant.Default,
      size: sizeProp,
      sizeOverride: sizeOverrideProp,
      darkMode: darkModeProp,
      name,
      ...rest
    }: ChatAvatarProps,
    fwdRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    const { containerWidth } = useLeafyGreenChatContext();
    const size =
      sizeProp || (containerWidth && containerWidth < breakpoints.Tablet)
        ? ChatAvatarSize.Small
        : ChatAvatarSize.Default;

    const sizeOverride = sizeOverrideProp ?? chatAvatarSizeMap[size];
    const format = variantToAvatarFormatMap[variant];
    const { initials } = getInitials(name);
    const testid = (() => {
      switch (variant) {
        case 'mongo':
          return 'mongo-avatar';
        case 'user':
          return 'user-avatar';
        case 'default':
        default:
          return 'fallback-avatar';
      }
    })();

    return (
      <Avatar
        ref={fwdRef}
        format={format}
        text={initials ?? undefined}
        glyph="Person"
        sizeOverride={sizeOverride}
        data-testid={testid}
        className={cx({
          [textAvatarStyleOverrides]: variant === ChatAvatarVariant.User,
          [iconAvatarStyleOverrides(theme)]:
            variant === ChatAvatarVariant.Default,
          [logoAvatarStyleOverrides(theme)]:
            variant === ChatAvatarVariant.Mongo,
        })}
        {...rest}
      />
    );
  },
);

ChatAvatar.displayName = 'Avatar';
