import React, { ForwardedRef, forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { AvatarWrapper } from '../AvatarWrapper';
import { FallbackAvatar } from '../FallbackAvatar';
import { Size } from '..';

import { baseStyles, sizeStyles } from './UserAvatar.styles';
import { UserAvatarProps } from './UserAvatar.types';
export const UserAvatar = forwardRef(
  (
    {
      className,
      name,
      darkMode: darkModeProp,
      size = Size.Default,
      ...rest
    }: UserAvatarProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);

    if (name) {
      return (
        <AvatarWrapper
          className={cx(baseStyles, sizeStyles[size], className)}
          size={size}
          data-testid="user-avatar"
          ref={ref}
          {...rest}
        >
          {name.slice(0)}
        </AvatarWrapper>
      );
    } else {
      return (
        <FallbackAvatar
          className={className}
          darkMode={darkMode}
          size={size}
          ref={ref}
          {...rest}
        />
      );
    }
  },
);

UserAvatar.displayName = 'UserAvatar';
