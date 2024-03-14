import React, { ForwardedRef, forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { MongoDBLogoMark } from '@leafygreen-ui/logo';

import { Size } from '../Avatar.types';
import { AvatarWrapper } from '../AvatarWrapper';

import { baseStyles, logoMarkStyles } from './MongoAvatar.styles';
import { MongoAvatarProps } from './MongoAvatar.types';

export const MongoAvatar = forwardRef(
  (
    {
      className,
      darkMode: darkModeProp,
      size = Size.Default,
      ...rest
    }: MongoAvatarProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { theme } = useDarkMode(darkModeProp);

    return (
      <AvatarWrapper
        className={cx(baseStyles[theme], className)}
        size={size}
        data-testid="mongo-avatar"
        {...rest}
        ref={ref}
      >
        <MongoDBLogoMark color="green-base" className={logoMarkStyles} />
      </AvatarWrapper>
    );
  },
);

MongoAvatar.displayName = 'MongoAvatar';
