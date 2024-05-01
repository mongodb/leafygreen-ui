import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { getAvatarStyles } from './Avatar.styles';
import { AvatarProps } from './Avatar.types';
import { AvatarContents } from './AvatarContents';

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (props, fwdRef) => {
    const { darkMode, format, size = Size.Default } = props;
    const { theme } = useDarkMode(darkMode);

    return (
      <div ref={fwdRef} className={getAvatarStyles({ size, theme, format })}>
        <AvatarContents {...props} />
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
