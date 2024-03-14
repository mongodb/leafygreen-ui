import React, { ForwardedRef, forwardRef } from 'react';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';

import { breakpoints } from '@leafygreen-ui/tokens';

import { FallbackAvatar } from '../FallbackAvatar/FallbackAvatar';
import { MongoAvatar } from '../MongoAvatar';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { AvatarProps, Size } from '..';

import { Variant } from './Avatar.types';

export const Avatar = forwardRef(
  (
    { variant = Variant.Default, size: sizeProp, ...rest }: AvatarProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { containerWidth } = useLeafyGreenChatContext();
    const size =
      sizeProp || (containerWidth && containerWidth < breakpoints.Tablet)
        ? Size.Small
        : Size.Default;

    switch (variant) {
      case Variant.Mongo:
        return <MongoAvatar {...rest} size={size} ref={ref} />;
      case Variant.User:
        return <UserAvatar {...rest} size={size} ref={ref} />;
      default:
        return <FallbackAvatar {...rest} size={size} ref={ref} />;
    }
  },
);

Avatar.displayName = 'Avatar';
