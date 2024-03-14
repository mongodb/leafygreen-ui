import React, { ForwardedRef, forwardRef } from 'react';

import { css, cx } from '@leafygreen-ui/emotion';

import { avatarSizes, Size } from '../Avatar.types';

import { baseStyles } from './AvatarWrapper.styles';
import { AvatarWrapperProps } from './AvatarWrapper.types';

export const AvatarWrapper = forwardRef(
  (
    {
      className,
      children,
      size: sizeProp = Size.Default,
      sizeOverride,
      ...rest
    }: AvatarWrapperProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const size = sizeOverride ?? avatarSizes[sizeProp];
    return (
      <div
        className={cx(
          baseStyles,
          css`
            width: ${size}px;
            height: ${size}px;
          `,
          className,
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

AvatarWrapper.displayName = 'Avatar';
