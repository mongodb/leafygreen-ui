import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { getAvatarStyles } from './Avatar.styles';
import { AvatarProps } from './Avatar.types';
import { AvatarContents } from './AvatarContents';

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (props, fwdRef) => {
    const {
      darkMode,
      format,
      size = Size.Default,
      sizeOverride,
      className,
      ...rest
    } = props;
    const { theme } = useDarkMode(darkMode);

    return (
      <div
        ref={fwdRef}
        className={cx(
          getAvatarStyles({ size, theme, format, sizeOverride }),
          className,
        )}
        data-testid="lg-avatar"
        {...rest}
      >
        <AvatarContents {...props} />
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';

/**
 * Water. Earth. Fire. Air.
 * Long ago, the four nations lived together in harmony.
 * Then, everything changed when the Fire Nation attacked
 */
