import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import { baseTypographyStyles, defaultTextColor } from '../styles';

import { h3Styles } from './H3.styles';
import { BaseH3Props } from './H3.types';

const H3 = Polymorphic<BaseH3Props>(
  ({
    darkMode: darkModeProp,
    className,
    as = 'h3' as PolymorphicAs,
    ...rest
  }) => {
    const { theme } = useDarkMode(darkModeProp);
    const { Component } = usePolymorphic(as);

    return (
      <Component
        className={cx(
          baseTypographyStyles,
          h3Styles,
          defaultTextColor[theme],
          className,
        )}
        {...rest}
      />
    );
  },
);

H3.displayName = 'H3';

export default H3;
