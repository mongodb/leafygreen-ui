import React, { ForwardedRef, forwardRef } from 'react';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';

import { Avatar, Format, getInitials } from '@leafygreen-ui/avatar';
import { breakpoints } from '@leafygreen-ui/tokens';

import {
  ChatAvatarProps,
  ChatAvatarSize,
  chatAvatarSizeMap,
  ChatAvatarVariant,
} from './Avatar.types';

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
      name,
      ...rest
    }: ChatAvatarProps,
    fwdRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const { containerWidth } = useLeafyGreenChatContext();
    const size =
      sizeProp || (containerWidth && containerWidth < breakpoints.Tablet)
        ? ChatAvatarSize.Small
        : ChatAvatarSize.Default;

    const sizeOverride = sizeOverrideProp ?? chatAvatarSizeMap[size];
    const format = variantToAvatarFormatMap[variant];
    const { initials } = getInitials(name);

    return (
      <Avatar
        ref={fwdRef}
        format={format}
        text={initials ?? undefined}
        glyph="Person"
        sizeOverride={sizeOverride}
        {...rest}
      />
    );

    // switch (variant) {
    //   case ChatAvatarVariant.Mongo:
    //     return <MongoAvatar {...rest} size={size} ref={ref} />;
    //   case ChatAvatarVariant.User:
    //     return <UserAvatar {...rest} size={size} ref={ref} />;
    //   default:
    //     return <FallbackAvatar {...rest} size={size} ref={ref} />;
    // }
  },
);

ChatAvatar.displayName = 'Avatar';
