import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { getAvatarStyles } from './Avatar.styles';
import { AvatarProps } from './Avatar.types';
import { AvatarContents } from './AvatarContents';

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ darkMode, format, size = Size.Default }, fwdRef) => {
    const { theme } = useDarkMode(darkMode);

    return (
      <div ref={fwdRef} className={getAvatarStyles({ size, theme, format })}>
        <AvatarContents format={format} size={size} />
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
