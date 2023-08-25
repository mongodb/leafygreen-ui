import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import { baseTypographyStyles, defaultTextColor } from '../styles';

import { subtitleStyles } from './Subtitle.styles';
import { BaseSubtitleProps } from './Subtitle.types';

const Subtitle = Polymorphic<BaseSubtitleProps>(
  ({
    darkMode: darkModeProp,
    className,
    as = 'h6' as PolymorphicAs,
    ...rest
  }) => {
    const { theme } = useDarkMode(darkModeProp);
    const { Component } = usePolymorphic(as);

    return (
      <Component
        className={cx(
          baseTypographyStyles,
          subtitleStyles,
          defaultTextColor[theme],
          className,
        )}
        {...rest}
      />
    );
  },
);

Subtitle.displayName = 'Subtitle';

export default Subtitle;
