import React, { ForwardedRef, forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
// @ts-expect-error Typescript imports of icons currently not supported
import PersonIcon from '@leafygreen-ui/icon/dist/Person';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';

import { Size } from '../Avatar.types';
import { AvatarWrapper } from '../AvatarWrapper';

import { baseStyles, iconStyles } from './FallbackAvatar.styles';
import { FallbackAvatarProps } from './FallbackAvatar.types';

export const FallbackAvatar = forwardRef(
  (
    {
      className,
      name,
      darkMode: darkModeProp,
      size = Size.Default,
      ...rest
    }: FallbackAvatarProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    return (
      <AvatarWrapper
        className={cx(baseStyles[theme], className)}
        size={size}
        data-testid="fallback-avatar"
        {...rest}
        ref={ref}
      >
        <PersonIcon
          className={iconStyles}
          fill={darkMode ? palette.gray.light1 : palette.white}
          alt={name}
        />
      </AvatarWrapper>
    );
  },
);

FallbackAvatar.displayName = 'FallbackAvatar';
