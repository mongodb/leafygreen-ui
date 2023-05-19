import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import { baseTypographyStyles, defaultTextColor } from '../styles';

import { overlineStyles } from './Overline.styles';
import { BaseOverlineProps } from './Overline.types';

export const Overline = Polymorphic<BaseOverlineProps>(
  ({
    darkMode: darkModeProp,
    className,
    as = 'div' as PolymorphicAs,
    ...rest
  }) => {
    const { theme } = useDarkMode(darkModeProp);
    const { Component } = usePolymorphic(as);

    return (
      <Component
        className={cx(
          baseTypographyStyles,
          overlineStyles,
          defaultTextColor[theme],
          className,
        )}
        {...rest}
      />
    );
  },
);

Overline.displayName = 'Overline';

export default Overline;
